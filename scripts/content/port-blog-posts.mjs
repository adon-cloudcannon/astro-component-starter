/**
 * Port the old site's posts into this project's blog.
 *
 * The bodies are prose with components embedded as Liquid: the old site drew
 * them with Bookshop, and this one draws them as MDX. Six components account
 * for every embed, and five of them have a counterpart here already.
 *
 *   node scripts/content/port-blog-posts.mjs [--dry-run] [--only <slug>]
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as yaml from "js-yaml";

const FROM = "/Users/adonmoskal/MARKETING-NEW/marketing-site-rework/src/collections";
const TO = "src/content/blog";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyAt = args.indexOf("--only");
const only = onlyAt === -1 ? undefined : args[onlyAt + 1];

/** The old site's own slugify, near enough: the permalinks were built with it. */
const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** `key: "value"` or `key:"value"`, as Bookshop wrote its arguments. */
function bookshopArgs(text) {
  const args = {};
  const pattern = /([\w-]+)\s*:\s*(?:"([^"]*)"|'([^']*)'|([\w.#-]+))/g;
  let match;
  while ((match = pattern.exec(text))) {
    args[match[1]] = match[2] ?? match[3] ?? match[4];
  }
  return args;
}

const attr = (name, value) =>
  value === undefined || value === "" ? "" : ` ${name}="${String(value).replace(/"/g, "&quot;")}"`;

/** The id at the end of a Vimeo player URL. */
const vimeoId = (url = "") => (String(url).match(/(\d{6,})/) ?? [])[1] ?? "";

function convertBody(body) {
  /* `raw` only ever protected Liquid from Liquid, and it goes first: removed
     after the code fences are built it can take the newline in front of a
     closing fence with it, which glues the fence to the last line of code. */
  let out = body.replace(/\{%-?\s*(end)?raw\s*-?%\}/g, "");
  const notes = [];

  /* A captured block feeding a code component becomes a fenced block, which
     is what markdown has for the job and what MDX leaves alone. */
  out = out.replace(
    /\{%-?\s*capture\s+(\w+)\s*-?%\}([\s\S]*?)\{%-?\s*endcapture\s*-?%\}\s*\{%-?\s*bookshop\s+"markdown\/complex-code-block"([^%]*)%\}/g,
    (_m, _name, code, rest) => {
      const language = bookshopArgs(rest).language ?? "";
      return "```" + language + "\n" + code.trim() + "\n```";
    }
  );

  /* Everything below rewrites prose, and none of it should reach inside a
     code sample: a post about Jekyll is full of Liquid, braces and `<script>`
     that are the subject rather than markup. Both kinds of code come out
     first and go back last. */
  const held = [];
  const hold = (pattern) => {
    out = out.replace(pattern, (block) => {
      held.push(block);
      return `\u0000HELD${held.length - 1}\u0000`;
    });
  };
  hold(/```[\s\S]*?```/g);
  hold(/`[^`\n]*`/g);

  out = out.replace(/\{%-?\s*bookshop\s+"markdown\/image"([^%]*)%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("image");
    return `<Image${attr("source", a.src)}${attr("alt", a.alt)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+"markdown\/youtube"([^%]*)%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("video");
    return `<Video type="youtube"${attr("videoId", a.id)}${attr("title", a.title)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+"markdown\/vimeo"([^%]*)%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("video");
    return `<Video type="vimeo"${attr("videoId", vimeoId(a.video))}${attr("title", a.title)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+"markdown\/annotation"([^%]*)%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("alert");
    return `<Alert variant="info"${attr("title", a.number)}${attr("text", a.annotation_content)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+"markdown\/button-repeat"([^%]*)%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("button");
    return `<Button${attr("text", a.text)}${attr("link", a.link)} variant="primary" />`;
  });

  /* A `style` or `script` left in the prose is a sample being shown, not
     markup meant to run: these posts are tutorials. MDX would try to execute
     it, and this site gates external media behind consent in any case. */
  out = out.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_m, css) => "```css\n" + css.trim() + "\n```");
  out = out.replace(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi, (_m, js) => "```js\n" + js.trim() + "\n```");
  /* A script with a src is a loader for a third-party widget, never sample
     code worth showing, and fencing it split the markup it sat inside. */
  out = out.replace(/<script[^>]*\bsrc="[^"]+"[^>]*>\s*<\/script>\n?/gi, "");

  /* An HTML comment is not a comment in MDX, it is a syntax error. These are
     editorial leftovers — a Notion sync id, a TODO — so they go. */
  out = out.replace(/<!--[\s\S]*?-->\n?/g, "");

  /* MDX is JSX underneath, where a void element has to close itself: the old
     bodies are HTML and write `<br>`. */
  const VOID = "area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr";
  out = out.replace(new RegExp(`<(${VOID})([^>]*?)\\s*/?>`, "gi"), (_m, tag, rest) => {
    const attrs = rest.trim();
    return `<${tag}${attrs ? " " + attrs : ""} />`;
  });

  /* Counted before it goes: a post quoting Liquid in a code sample is doing
     the right thing and its samples are held aside, so what is counted here
     is Liquid left in the prose. */
  const leftover = (out.match(/\{%|\{\{/g) ?? []).length;

  /* That leftover is the old site's control flow — an `include` of a snippet
     that does not exist here, a `for` over posts, an `assign`. Escaping it
     would print it, so it is dropped, and every post it touched is named in
     the run's output so the gap can be filled. */
  out = out
    .replace(/\{%-?[\s\S]*?-?%\}\n?/g, "")
    .replace(/\{\{-?[\s\S]*?-?\}\}/g, "")
    .replace(/\n{3,}/g, "\n\n");

  /* Whatever brace is left is prose — a CSS rule written inline, a stray
     bracket — and MDX reads it as the start of an expression. */
  out = out.replace(/(?<!\\)([{}])/g, "\\$1");

  out = out.replace(/\u0000HELD(\d+)\u0000/g, (_m, i) => held[Number(i)]);

  return { body: out.trim(), notes, leftover };
}

/* uuid -> name, from the old authors collection. */
const authors = new Map();
for (const file of await readdir(`${FROM}/authors`)) {
  if (!file.endsWith(".md")) continue;
  const front = (await readFile(`${FROM}/authors/${file}`, "utf8")).match(/^---\n([\s\S]*?)\n---/);
  if (!front) continue;
  const data = yaml.load(front[1]) ?? {};
  if (data.uuid && data.name) authors.set(data.uuid, data.name);
}

await mkdir(TO, { recursive: true });
const files = (await readdir(`${FROM}/posts`)).filter((f) => f.endsWith(".md"));
const used = new Set();
let written = 0;
const needsEyes = [];
const componentCount = {};

for (const file of files) {
  const source = await readFile(`${FROM}/posts/${file}`, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) continue;

  const old = yaml.load(match[1]) ?? {};
  const title = old.title ?? file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");

  /* The URL the old site gave it: almost always the slugified title, which is
     what keeps the links into these posts landing. */
  const permalink = String(old.permalink ?? "");
  let slug;
  if (/\{\{\s*title/.test(permalink) || !permalink) slug = slugify(title);
  else if (/\{\{\s*breadcrumb_title/.test(permalink)) slug = slugify(old.breadcrumb_title ?? title);
  else slug = slugify(permalink.replace(/^\/|\/$/g, "").split("/").pop() ?? title);

  if (only && slug !== only) continue;
  while (used.has(slug)) slug = `${slug}-2`;
  used.add(slug);

  const { body, notes, leftover } = convertBody(match[2]);
  for (const n of notes) componentCount[n] = (componentCount[n] ?? 0) + 1;
  if (leftover) needsEyes.push(`${slug} (${leftover} liquid tag${leftover === 1 ? "" : "s"} left)`);

  const data = {
    title,
    description: String(old.description ?? "").trim() || title,
    date: (old.date ?? old.original_published_date ?? new Date()).toString(),
    author: authors.get((old.authors ?? [])[0]) ?? "CloudCannon",
    ...(old.image ? { image: old.image } : {}),
    tags: old.categories ?? [],
    ...(old.draft === true ? { draft: true } : {}),
    ...(permalink && !permalink.includes("{{") ? { legacyUrl: permalink } : {}),
  };
  if (old.date instanceof Date) data.date = old.date.toISOString();

  const imports = [];
  if (notes.includes("image")) imports.push('import Image from "@core-elements/image/Image.astro";');
  if (notes.includes("video")) imports.push('import Video from "@core-elements/video/Video.astro";');
  if (notes.includes("alert")) imports.push('import Alert from "@core-elements/alert/Alert.astro";');
  if (notes.includes("button")) imports.push('import Button from "@core-elements/button/Button.astro";');

  const front = yaml.dump(data, { lineWidth: 92, noRefs: true }).trimEnd();
  const out = `---\n${front}\n---\n\n${imports.length ? imports.join("\n") + "\n\n" : ""}${body}\n`;
  if (!dryRun) await writeFile(path.join(TO, `${slug}.mdx`), out, "utf8");
  written += 1;
}

console.log(`${written} post(s) ${dryRun ? "would be written" : "written"}.`);
console.log("components converted:", Object.entries(componentCount).map(([k, v]) => `${k} ${v}`).join(", ") || "none");
if (needsEyes.length) {
  console.log(`\n${needsEyes.length} post(s) still carry Liquid and want a human:`);
  for (const line of needsEyes.slice(0, 12)) console.log(`  ${line}`);
  if (needsEyes.length > 12) console.log(`  ... and ${needsEyes.length - 12} more`);
}
