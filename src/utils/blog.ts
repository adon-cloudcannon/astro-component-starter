import { getCollection } from "astro:content";

/** Blog posts newest-first (for index and tag archives). */
export async function getBlogPostsSortedByDate() {
  const posts = await getCollection("blog");

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Replace the heading of a listing's hero section. Every blog listing — the
 * index, its pages 2..n, and each tag archive — renders the same hero out of
 * `src/content/pages/blog.md`, so without this they all share one h1.
 */
/** What the blog is called in a trail or an archive title, not its own copy. */
export function blogLabel(blogPage: any): string {
  return blogPage?.data?.shortTitle ?? blogPage?.data?.title ?? "Blog";
}

/** The heading the listing hero carries, whichever shape it is written in. */
export function listingHeadingOf(heroSections: any[]): string | undefined {
  for (const section of heroSections) {
    const nested = section?.content?.heading?.heading;

    if (typeof nested === "string") return nested;
    if (typeof section?.heading === "string") return section.heading;
  }

  return undefined;
}

export function withListingHeading(heroSections: any[], heading: string) {
  let replaced = false;

  return heroSections.map((section) => {
    if (replaced) return section;

    /* A section written in the editor nests its copy under `content`, and the
       heading again under `heading` — `{ content: { heading: { heading } } }`.
       A flat `heading` is the shape a section built in code passes. */
    if (typeof section?.content?.heading?.heading === "string") {
      replaced = true;

      return {
        ...section,
        content: {
          ...section.content,
          heading: { ...section.content.heading, heading },
        },
      };
    }

    if (typeof section?.heading === "string") {
      replaced = true;

      return { ...section, heading };
    }

    return section;
  });
}

/**
 * Drop the hero's breadcrumb trail. Tag archives render their own
 * Blog > Tag trail in the listing grid, so leaving the hero's on would put two
 * `<nav aria-label="Breadcrumb">` landmarks on the page.
 */
export function withoutHeroBreadcrumbs(heroSections: any[]) {
  return heroSections.map((section) =>
    section?.showBreadcrumbs ? { ...section, showBreadcrumbs: false } : section
  );
}

/**
 * CMS `pages` entry with id `blog`, split into what runs above the listing and
 * what closes the page. Every blog surface renders the same two ends around
 * its own middle: the first section is the hero, the rest close.
 */
export async function loadBlogPageContext() {
  let blogPage: any;
  let heroSections: any[] = [];
  let closingSections: any[] = [];

  try {
    const pages = await getCollection("pages");

    blogPage = pages.find((p: any) => p.id === "blog");

    if (blogPage?.data?.pageSections) {
      heroSections = blogPage.data.pageSections.slice(0, 1);
      closingSections = blogPage.data.pageSections.slice(1);
    }
  } catch (e) {
    console.error("Failed to load blog page data:", e);
  }

  return { blogPage, heroSections, closingSections };
}
