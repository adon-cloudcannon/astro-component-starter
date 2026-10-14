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
  /* Escape-aware: a value is quoted either way and may carry the other kind
     of quote, or an escaped one of its own — the callouts hold HTML. */
  const pattern = /([\w-]+)\s*:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|([\w.#-]+))/g;
  let match;
  while ((match = pattern.exec(text))) {
    const raw = match[2] ?? match[3] ?? match[4];
    args[match[1]] = typeof raw === "string" ? raw.replace(/\\(["'])/g, "$1") : raw;
  }
  return args;
}

const attr = (name, value) =>
  value === undefined || value === "" ? "" : ` ${name}="${String(value).replace(/"/g, "&quot;")}"`;

/** Heroicons names the old site used, in this project's Lucide set. */
const ICONS = {
  /* Heroicons' bolt is a lightning bolt; Lucide's is a hex nut. */
  bolt: "zap",
  "code-bracket": "code-xml",
  "queue-list": "list-ordered",
  "information-circle": "info",
  "light-bulb": "lightbulb",
  "pencil-square": "square-pen",
  photo: "image",
  window: "app-window",
  "user-group": "users",
  "circle-stack": "database",
  "server-stack": "server",
  "cpu-chip": "cpu",
  "x-circle": "circle-x",
  "chevron-double-right": "chevrons-right",
  "clipboard-document-check": "clipboard-check",
  "wrench-screwdriver": "wrench",
  "adjustments-vertical": "sliders-vertical",
  "device-phone-mobile": "smartphone",
  "face-smile": "smile",
  "hand-thumb-up": "thumbs-up",
  "question-mark-circle": "circle-question-mark",
  "paint-brush": "paintbrush",
  "exclamation-triangle": "triangle-alert",
  "bell-alert": "bell-ring",
};

/* The old callouts carry their tone as a colour name. */
const CALLOUT_VARIANTS = { "cc-blue": "info", emerald: "success", ruby: "danger" };

/** The id at the end of a Vimeo player URL. */
const vimeoId = (url = "") => (String(url).match(/(\d{6,})/) ?? [])[1] ?? "";

function convertBody(body) {
  /* `raw` only ever protected Liquid from Liquid, and it goes first: removed
     after the code fences are built it can take the newline in front of a
     closing fence with it, which glues the fence to the last line of code. */
  let out = body.replace(/\{%-?\s*(end)?raw\s*-?%\}/g, "");
  const notes = [];

  /* A captured block feeding a code component becomes a CodeBlock, which is
     the same chrome the old component drew: the language, the file it came
     from, and a button to copy it. Without a file name there is nothing to
     label, so a plain fence says it more simply. */
  out = out.replace(
    /\{%-?\s*capture\s+(\w+)\s*-?%\}([\s\S]*?)\{%-?\s*endcapture\s*-?%\}\s*\{%-?\s*bookshop\s+['\"]?markdown\/complex-code-block['\"]?([\s\S]*?)-?%\}/g,
    (_m, _name, code, rest) => {
      const a = bookshopArgs(rest);
      const language = a.language ?? "";
      const source = code.trim();

      if (!a.file_name) return "```" + language + "\n" + source + "\n```";

      notes.push("codeBlock");

      const tab = { language, filename: a.file_name, code: source };

      return `<CodeBlock tabs={${JSON.stringify([tab])}} />`;
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
  /* The CodeBlock written above carries its sample in a JSX expression, which
     the brace escaper below would otherwise break. */
  hold(/<CodeBlock[\s\S]*?\/>/g);

  out = out.replace(/\{%-?\s*bookshop\s+['\"]?markdown\/image['\"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("image");
    return `<Image${attr("source", a.src)}${attr("alt", a.alt)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+['\"]?markdown\/youtube['\"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("video");
    return `<Video type="youtube"${attr("videoId", a.id)}${attr("title", a.title)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+['\"]?markdown\/vimeo['\"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("video");
    return `<Video type="vimeo"${attr("videoId", vimeoId(a.video))}${attr("title", a.title)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+['\"]?markdown\/annotation['\"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("alert");
    const tone = CALLOUT_VARIANTS[String(a.color ?? "")] ?? "info";
    return `<Alert variant="${tone}"${attr("title", a.number)}${attr("data-annotation", a.number)}${attr("text", a.annotation_content)} />`;
  });

  out = out.replace(/\{%-?\s*bookshop\s+['\"]?markdown\/button-repeat['\"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    notes.push("button");
    const newTab = String(a.open_in_new_tab) === "true" ? ' target="_blank" rel="noopener"' : "";
    return `<Button${attr("text", a.text)}${attr("link", a.link)} variant="primary"${newTab} />`;
  });

  /* A table the old site wrapped for small screens. The markup inside is
     already a table, so it comes straight out: the quotes within it are
     escaped for YAML and have to be put back. */
  out = out.replace(
    /\{%-?\s*bookshop\s+['"]?markdown\/tablesaw['"]?[^"]*"((?:[^"\\]|\\.)*)"\s*-?%\}/g,
    (_m, html) => "\n" + html.replace(/\\"/g, '"').replace(/\\n/g, "\n").trim() + "\n"
  );

  /* Both of the old site's callouts are this project's Alert. The text is
     quoted either way and holds HTML, so it is read with the shared argument
     parser rather than a quote pattern of its own. */
  for (const [name, variant] of [["notice-banner", "info"], ["callout-box", "note"]]) {
    out = out.replace(
      new RegExp(`\\{%-?\\s*bookshop\\s+['"]?markdown/${name}['"]?([\\s\\S]*?)-?%\\}`, "g"),
      (_m, rest) => {
        const a = bookshopArgs(rest);
        const body = String(a.text ?? "")
          .replace(/<\/?lb\s*\/?>/g, " ")
          .replace(/\s+/g, " ")
          .trim();

        if (!body) return "";

        notes.push("alert");

        /* The callout chose its own icon and tone, which the Alert takes as
           `iconName` and `variant`. Heroicons names are mapped the way the
           inline icons are; one the map has not met carries over as-is. */
        const heroicon = String(a.icon_path ?? "").split("/").pop();
        const iconName = heroicon ? (ICONS[heroicon] ?? heroicon) : "";
        const tone = CALLOUT_VARIANTS[String(a.color ?? "")] ?? variant;

        return `<Alert variant="${tone}"${attr("iconName", iconName)}${attr("text", body)} />`;
      }
    );
  }

  /* A row of copy beside a picture. The copy is markdown already, so it comes
     out as itself with the picture under it rather than as a column layout the
     body has no component for. */
  out = out.replace(
    /\{%-?\s*bookshop\s+['"]?markdown\/left-right-two-column['"]?([\s\S]*?)-?%\}/g,
    (_m, rest) => {
      const a = bookshopArgs(rest);
      const copy = String(a.text ?? "").trim();
      const picture = a.image_url
        ? `<Image${attr("source", a.image_url)}${attr("alt", a.image_alt ?? "")} />`
        : "";

      if (picture) notes.push("image");

      return [copy, picture].filter(Boolean).join("\n\n");
    }
  );

  /* An inline icon, drawn from Heroicons on the old site and from Lucide
     here. The names that differ are mapped; the rest carry over. */
  out = out.replace(/\{%-?\s*bookshop\s+['"]?markdown\/inline-icon['"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    const name = ICONS[String(a.icon_path ?? "").split("/").pop()] ?? String(a.icon_path ?? "").split("/").pop();
    if (!name) return "";
    notes.push("icon");
    return `<Icon name="${name}" size="sm" />`;
  });

  /* An anchor the post links to from its own text. */
  out = out.replace(/\{%-?\s*bookshop\s+['"]?markdown\/anchor['"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    return a.name ? `<span id="${a.name}" />` : "";
  });

  /* An embed this site would gate behind consent anyway, so it becomes the
     link it points at. */
  out = out.replace(/\{%-?\s*bookshop\s+['"]?markdown\/spotify['"]?([\s\S]*?)-?%\}/g, (_m, rest) => {
    const a = bookshopArgs(rest);
    return a.src ? `[Listen on Spotify](https://open.spotify.com/${a.src})` : "";
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

/* uuid -> name, and name -> portrait, from the old authors collection. The
   portraits stay on the CDN the posts' own pictures are already served from. */
const authors = new Map();
const portraits = {};
for (const file of await readdir(`${FROM}/authors`)) {
  if (!file.endsWith(".md")) continue;
  const front = (await readFile(`${FROM}/authors/${file}`, "utf8")).match(/^---\n([\s\S]*?)\n---/);
  if (!front) continue;
  const data = yaml.load(front[1]) ?? {};
  if (!data.uuid || !data.name) continue;
  authors.set(data.uuid, data.name);
  const image = typeof data.image === "object" ? data.image?.path : data.image;
  portraits[data.name] = { image: image ?? "" };
}

/* The old site had no bios, so a writer's body text is written here by hand
   and a re-port must not wipe it. The frontmatter is regenerated. */
const AUTHORS_DIR = "src/content/authors";
if (!dryRun) {
  await mkdir(AUTHORS_DIR, { recursive: true });
  for (const [name, entry] of Object.entries(portraits)) {
    const file = path.join(AUTHORS_DIR, `${slugify(name)}.md`);
    let bio = "";
    try {
      bio = (await readFile(file, "utf8")).replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
    } catch {
      bio = "";
    }
    const front = yaml
      .dump({ name, ...(entry.image ? { image: entry.image, imageAlt: name } : {}) }, { lineWidth: 92 })
      .trimEnd();
    await writeFile(file, `---\n${front}\n---\n\n${bio}\n`, "utf8");
  }
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
  else {
    /* Trailing slashes come in pairs on a few of these, and one empty final
       segment is the difference between a post's URL and no URL at all. */
    const segments = permalink.split("/").filter(Boolean);
    slug = slugify(segments.pop() || title);
  }

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
    authors: (old.authors ?? []).map((id) => authors.get(id)).filter(Boolean),
    ...(old.image ? { image: old.image } : {}),
    tags: old.categories ?? [],
    ...(old.draft === true ? { draft: true } : {}),
    ...(permalink && !permalink.includes("{{") ? { legacyUrl: permalink } : {}),
  };

  /* Each post carried its own closing banner on the old site, and they differ:
     an Astro post closes on Astro. */
  const oldCta = old.cta ?? {};
  if (oldCta.title) {
    data.cta = {
      heading: String(oldCta.title).trim(),
      ...(oldCta.body_text ? { subtext: String(oldCta.body_text).trim() } : {}),
      ...(oldCta.button?.content?.text ? { linkText: String(oldCta.button.content.text).trim() } : {}),
      ...(oldCta.button?.content?.link ? { link: String(oldCta.button.content.link).trim() } : {}),
    };
  }
  if (old.date instanceof Date) data.date = old.date.toISOString();
  if (!data.authors.length) data.authors = ["CloudCannon"];

  const imports = [];
  if (notes.includes("image")) imports.push('import Image from "@core-elements/image/Image.astro";');
  if (notes.includes("video")) imports.push('import Video from "@core-elements/video/Video.astro";');
  if (notes.includes("alert")) imports.push('import Alert from "@core-elements/alert/Alert.astro";');
  if (notes.includes("button")) imports.push('import Button from "@core-elements/button/Button.astro";');
  if (notes.includes("icon")) imports.push('import Icon from "@core-elements/icon/Icon.astro";');
  if (notes.includes("codeBlock"))
    imports.push('import CodeBlock from "@core-elements/code-block/CodeBlock.astro";');

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
