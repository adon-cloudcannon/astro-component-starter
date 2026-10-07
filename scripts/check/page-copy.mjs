/**
 * Compare every page's copy against an earlier commit.
 *
 * Restructuring the pages has twice moved text rather than keeping it: a
 * block ended up with two `heading` keys, the parser kept the empty one, and
 * three headings on the homepage were replaced by the structure value's
 * default — "Ready to get started?" where real copy belonged. Nothing failed,
 * nothing 500'd, and the pages rendered.
 *
 * So the check is on the copy itself rather than on the shape. It reads the
 * same fields whether they are flat or grouped, which is what lets a run
 * before a migration be compared with one after it.
 *
 * Usage: node scripts/check/page-copy.mjs <git-ref>
 */
import { execSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import YAML from "yaml";

const base = process.argv[2];

if (!base) {
  console.log("usage: node scripts/check/page-copy.mjs <git-ref>");
  process.exit(1);
}

const load = (text) => {
  try {
    return YAML.parse(text.split(/^---$/m)[1] ?? "") ?? {};
  } catch {
    return null;
  }
};

/** The groups a field may be sitting in, so flat and grouped read the same. */
const GROUPS = ["heading", "subtext", "image", "member"];
const FIELDS = [
  "sectionLabel",
  "eyebrow",
  "heading",
  "subtext",
  "linkText",
  "note",
  "label",
  "text",
  "figure",
];

const field = (block, name) => {
  const content = block?.content ?? block ?? {};

  for (const group of [content, ...GROUPS.map((g) => content[g])]) {
    if (group && typeof group === "object" && typeof group[name] === "string") return group[name];
  }
  return undefined;
};

/** Every array's length, keyed by leaf name so a move does not read as a loss. */
const listSizes = (node, path, out = {}) => {
  if (Array.isArray(node)) {
    out[path] = node.length;
    for (const item of node) listSizes(item, `${path}[]`, out);
    return out;
  }
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      const inGroup = ["content", "style", ...GROUPS].includes(key);

      listSizes(value, inGroup ? path : path ? `${path}.${key}` : key, out);
    }
  }
  return out;
};

const show = (value) => JSON.stringify(String(value ?? "").slice(0, 78));
let problems = 0;

for (const file of readdirSync("src/content/pages").filter((f) => f.endsWith(".md"))) {
  let was;

  try {
    was = load(
      execSync(`git show ${base}:src/content/pages/${file}`, {
        encoding: "utf8",
        maxBuffer: 1 << 26,
      })
    );
  } catch {
    continue; // the page did not exist at that ref
  }
  if (!was) {
    console.log(`${file}: unreadable at ${base}`);
    continue;
  }

  const now = load(readFileSync(`src/content/pages/${file}`, "utf8"));
  const before = was.pageSections ?? [];
  const after = now?.pageSections ?? [];
  const notes = [];

  if (before.length !== after.length) notes.push(`  ${before.length} blocks -> ${after.length}`);

  for (let i = 0; i < Math.min(before.length, after.length); i++) {
    const name = after[i]._component?.split("/").pop() ?? "?";

    if (before[i]._component !== after[i]._component) {
      notes.push(`  block ${i}: ${before[i]._component} -> ${after[i]._component}`);
      continue;
    }

    for (const key of FIELDS) {
      const a = field(before[i], key);
      const b = field(after[i], key);

      if (a === undefined && b === undefined) continue;
      if ((a ?? "") !== (b ?? "")) {
        notes.push(`  block ${i} ${name} · ${key}\n     was ${show(a)}\n     now ${show(b)}`);
      }
    }

    const sizesBefore = listSizes(before[i], "");
    const sizesAfter = listSizes(after[i], "");

    for (const [key, count] of Object.entries(sizesBefore)) {
      const other = sizesAfter[key];

      if (other !== undefined && other < count) {
        notes.push(`  block ${i} ${name} · ${key}: ${count} items -> ${other}`);
      }
    }
  }

  if (notes.length) {
    problems += notes.length;
    console.log(`\n=== ${file}\n${notes.join("\n")}`);
  }
}

console.log(
  problems
    ? `\n${problems} difference(s) against ${base}. Each one is either a deliberate edit or copy that went missing — read them, do not count them.`
    : `No copy differences against ${base}.`
);
