/**
 * A post's category, as the blog draws it.
 *
 * A post carries its categories as plain tags; the blog leads with the first
 * one and paints it a palette colour. The design draws two of these — Resources
 * in Sunset, Companies in Kiwi — and the rest are chosen to stay apart from
 * those two and from each other. A tag with no entry here falls back to Earth,
 * so a new category reads as a category rather than vanishing.
 *
 * Adding a category means adding a row: the label is what the pill says, the
 * accent is a palette colour name that `accentInk` knows how to pair ink with.
 */
const CATEGORIES = {
  resources: { label: "Resources", accent: "sunset" },
  company: { label: "Companies", accent: "kiwi" },
  features: { label: "Features", accent: "pacific" },
  agencies: { label: "Agencies", accent: "moss" },
  opinion: { label: "Opinion", accent: "earth" },
  tutorials: { label: "Tutorials", accent: "golden" },
  beginner: { label: "Beginner", accent: "harbour" },
};

const FALLBACK_ACCENT = "earth";

const normalise = (value) => String(value).trim().toLowerCase().replace(/\s+/g, "-");

/**
 * The category to draw for a post, or nothing where it carries no tags.
 *
 * `preferred` is the category being browsed: a post filed under three of them
 * shows the one whose archive the reader is on, not whichever happens to be
 * written first.
 */
export function postCategory(tags, preferred = "") {
  const all = (tags ?? []).filter((t) => typeof t === "string" && t.trim());
  const wanted = preferred ? normalise(preferred) : "";
  const tag = (wanted && all.find((t) => normalise(t) === wanted)) || all[0];

  if (!tag) return null;

  const key = tag.trim().toLowerCase();
  const known = CATEGORIES[key];

  /* `tag` is the word the post actually carries, which is what the archive's
     URL is built from — "company", not the "Companies" it is labelled. */
  return {
    tag: tag.trim(),
    label: known?.label ?? tag.trim().replace(/^./, (c) => c.toUpperCase()),
    accent: known?.accent ?? FALLBACK_ACCENT,
  };
}

/**
 * Every category a post is filed under, in the order it should read.
 *
 * `preferred` is the one being browsed, which leads: on the Features archive a
 * post filed under three of them leads with Features.
 */
export function postCategories(tags, preferred = "") {
  const all = (tags ?? []).filter((t) => typeof t === "string" && t.trim());
  const wanted = preferred ? normalise(preferred) : "";
  const ordered = wanted
    ? [...all].sort((a, b) => Number(normalise(b) === wanted) - Number(normalise(a) === wanted))
    : all;

  return ordered.map((tag) => postCategory([tag])).filter(Boolean);
}

/** The label a category is written by, given the word a post files it under. */
export function categoryLabel(tag) {
  return postCategory([tag])?.label ?? String(tag ?? "");
}

export { CATEGORIES as POST_CATEGORIES };
