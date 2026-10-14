import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

const contentBlockSchema = z.object({ _component: z.string() }).passthrough();
const docsViewerSizeSchema = z.enum(["sm", "md", "lg", "xl"]);

const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  image: z.string().optional(),
  canonical: z.string().optional(),
  noindex: z.boolean().optional(),
  pageSections: z.array(contentBlockSchema),
});

const docsPageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  contentSections: z.array(contentBlockSchema),
});

const docsComponentSchema = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  order: z.number().optional(),
  overview: z.string().optional(),
  description: z.string().optional(),
  defaultSize: docsViewerSizeSchema.optional(),
  // Spacing for the synthesized primary example (see ComponentLayout.astro).
  spacing: z.string().optional().nullable(),
  component: z.string().optional(),
  component_path: z.string().optional(),
  slots: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        fallback_for: z.string().optional().nullable(),
        child_component: z
          .object({
            // Optional: derived from the component source (see slotDerivation.ts).
            name: z.string().optional(),
            props: z.array(z.string()).optional(),
          })
          .optional()
          .nullable(),
      })
    )
    .optional(),
  examples: z
    .union([
      z.array(
        z.object({
          title: z.string().optional(),
          slugs: z.array(z.string()),
          size: docsViewerSizeSchema.optional(),
        })
      ),
      z.null(),
    ])
    .optional()
    .transform((val) => {
      if (!val) return [];

      return val.map((example) => ({
        title:
          example.title ||
          (example.slugs?.[0]
            ? example.slugs[0].replace(/-/g, " ").charAt(0).toUpperCase() +
              example.slugs[0].replace(/-/g, " ").slice(1)
            : "Example"),
        slugs: example.slugs,
        size: example.size,
      }));
    }),
});

// Hand-written docs examples. `title` is required — ComponentViewer reads it
// unconditionally, so a missing one is a build error rather than a render crash.
const docsComponentExampleSchema = z.object({
  title: z.string(),
  spacing: z.string().optional().nullable(),
  blocks: z
    .union([z.record(z.string(), z.any()), z.array(z.record(z.string(), z.any()))])
    .optional(),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: pageSchema,
});

const docsPagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/component-docs/content/pages" }),
  schema: docsPageSchema,
});

const docsComponentsCollection = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/component-docs/content/components" }),
  schema: docsComponentSchema,
});

const docsComponentExamplesCollection = defineCollection({
  loader: glob({ pattern: "**/examples/*.md", base: "./src/component-docs/content/components" }),
  schema: docsComponentExampleSchema,
});

const blogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  author: z.string().default("Anonymous"),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).optional(),
});

/**
 * A template in the gallery.
 *
 * Ported from the old site's `templates` collection, with its old-site
 * chrome dropped: `sidebar_content_top`/`_bottom` become named sidebar
 * blocks, and `starter`/`partner`/`priority` become the `collections` the
 * list page's pills filter on.
 */
const templateSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  imageAlt: z.string().optional(),
  order: z.number().optional(),
  collections: z.array(z.string()).optional(),
  ssgs: z.array(z.string()).optional(),
  previewUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  /* A starter's page is a different page: its sidebar lists what you get and
     what is built with it, where a template's offers a generator and a
     deploy. */
  starter: z.boolean().optional(),
  spec: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  bonus: z
    .object({
      label: z.string().optional(),
      links: z.array(z.object({ text: z.string(), link: z.string().optional() })).optional(),
    })
    .optional(),
  buildWith: z.array(z.object({ text: z.string(), link: z.string().optional() })).optional(),
  gallery: z.array(z.object({ image: z.string(), alt: z.string().optional() })).optional(),
  sidebar: z.array(z.object({ label: z.string().optional(), body: z.string() })).optional(),
  draft: z.boolean().optional(),
});

const templatesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/templates" }),
  schema: templateSchema,
});

/* The expert directory, ported from the old site. The body is the agency's
   own longer description; `work` is the case studies it shows on its page. */
const expertSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  logo: z.string().optional(),
  location: z.string().optional(),
  regions: z.array(z.string()).optional(),
  ssgs: z.array(z.string()).optional(),
  siteUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  work: z
    .array(z.object({ title: z.string(), image: z.string().optional(), body: z.string().optional() }))
    .optional(),
  draft: z.boolean().optional(),
});

const expertsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experts" }),
  schema: expertSchema,
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: blogPostSchema,
});

export const collections = {
  pages: pagesCollection,
  templates: templatesCollection,
  experts: expertsCollection,
  "docs-pages": docsPagesCollection,
  "docs-components": docsComponentsCollection,
  "docs-component-examples": docsComponentExamplesCollection,
  blog: blogCollection,
};
