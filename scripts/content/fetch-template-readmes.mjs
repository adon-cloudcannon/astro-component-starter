/**
 * Pull each template's README out of its repository and store it as the body
 * of that template's content file.
 *
 * The old site downloaded these at build time, which made every build need
 * the network and GitHub's good mood, and left the text somewhere nobody
 * could edit. Fetching once and committing the result keeps builds offline,
 * puts the words in the repo where CloudCannon can edit them, and makes a
 * README change a reviewable diff rather than a silent one.
 *
 *   node scripts/content/fetch-template-readmes.mjs [--dry-run] [--only <slug>]
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = "src/content/templates";
const BRANCHES = ["main", "master"];

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyAt = args.indexOf("--only");
const only = onlyAt === -1 ? undefined : args[onlyAt + 1];

/** The raw-content base for a repository URL, or nothing if it is not GitHub. */
function rawBase(repoUrl) {
  const match = String(repoUrl).match(/github\.com\/([^/]+)\/([^/?#]+)/);
  if (!match) return undefined;

  return `https://raw.githubusercontent.com/${match[1]}/${match[2].replace(/\.git$/, "")}`;
}

/**
 * What of a README belongs on the page.
 *
 * The title is the page's own, the badges and the deploy button are the
 * repository's furniture, and a screenshot repeats the gallery below.
 */
function readable(markdown) {
  return markdown
    .replace(/^#\s+.*\n+/, "")
    /* GitHub's alert marker, which plain markdown renders as a blockquote
       reading "[!NOTE]". Written as a labelled span instead: the page colours
       the callout from that class, and an inline tag leaves the markdown
       around it alone — a block-level wrapper would swallow the links in the
       body. */
    .replace(
      /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/gim,
      (_match, kind) => {
        const name = kind[0] + kind.slice(1).toLowerCase();
        return `> <strong class="callout-label callout-${kind.toLowerCase()}">${name}</strong>\n>`;
      }
    )
    .replace(/^\s*\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)\s*$/gm, "")
    .replace(/^\s*!\[[^\]]*\]\([^)]*\)\s*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fetchReadme(base) {
  for (const branch of BRANCHES) {
    for (const name of ["README.md", "readme.md"]) {
      const response = await fetch(`${base}/${branch}/${name}`);
      if (response.ok) return await response.text();
    }
  }
  return undefined;
}

const files = (await readdir(DIR)).filter((f) => f.endsWith(".md"));
let written = 0;
let skipped = 0;

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  if (only && slug !== only) continue;

  const full = path.join(DIR, file);
  const source = await readFile(full, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    console.log(`skip   ${slug.padEnd(28)} no frontmatter`);
    skipped += 1;
    continue;
  }

  const [, frontmatter, body] = match;
  const repo = frontmatter.match(/^repoUrl:\s*(\S+)/m)?.[1];
  const base = repo && rawBase(repo);
  if (!base) {
    console.log(`skip   ${slug.padEnd(28)} ${repo ? "not a GitHub repository" : "no repoUrl"}`);
    skipped += 1;
    continue;
  }

  const readme = await fetchReadme(base);
  if (!readme) {
    console.log(`MISS   ${slug.padEnd(28)} no README on ${BRANCHES.join(" or ")}`);
    skipped += 1;
    continue;
  }

  const next = readable(readme);
  if (next === body.trim()) {
    console.log(`same   ${slug.padEnd(28)} ${next.length} chars`);
    continue;
  }

  if (!dryRun) await writeFile(full, `---\n${frontmatter}\n---\n\n${next}\n`, "utf8");
  console.log(`${dryRun ? "would" : "wrote"}  ${slug.padEnd(28)} ${next.length} chars`);
  written += 1;
}

console.log(`\n${written} file(s) ${dryRun ? "would change" : "written"}, ${skipped} skipped.`);
