/**
 * What each static site generator calls itself.
 *
 * The ids come from the old site's content and are lowercase and punctuation
 * free; the names are how each project writes its own. Anything not listed
 * takes its id with the first letter raised, which is right for Astro, Hugo,
 * Jekyll and Gatsby.
 */
const NAMES = {
  "11ty": "Eleventy",
  nextjs: "Next.js",
  nuxtjs: "Nuxt",
  sveltekit: "SvelteKit",
  mkdocs: "MkDocs",
};

/** The name a generator goes by, from the id the content carries. */
export function ssgName(id) {
  return NAMES[id] ?? String(id ?? "").charAt(0).toUpperCase() + String(id ?? "").slice(1);
}

export { NAMES as SSG_NAMES };
