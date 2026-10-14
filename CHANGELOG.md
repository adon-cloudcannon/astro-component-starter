# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [2.0.0] - Unreleased

A big release: a browsable reference site for every component, site-wide
search, a privacy and consent workflow, automatic share cards, many new page
sections and building blocks, tooling that catches editor problems before they
ship, and a long list of accessibility fixes. If you have a site on this
starter, read the **Heads-up** items under Changed before upgrading: several
change how things look, and every page section moves to a new path.

### Added

#### Making the starter your own

- `npm run reset:starter` clears the demo content out of a fresh copy and sets your site name and URL. `--dry-run` shows the plan first, and it only runs on a clean git tree.
- `npm run check:placeholders` warns when starter placeholders are still in place, most importantly the `example.com` URL.
- Guides: `docs/DEPLOYMENT.md` for going live on CloudCannon, and `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md` and `docs/ARCHITECTURE.md` for people and AI agents working on the project.
- A `LICENSE` file (MIT), and recorded provenance for the icon set in `src/icons/README.md`.

#### Privacy and consent

- A site-wide privacy and consent workflow, edited in CloudCannon's **Privacy & Consent** and **Analytics** data panels. It is strict opt-in: analytics and external media stay off until the visitor allows them, and stay off when the workflow is disabled. The banner gives Accept All, Reject All and Customize equal weight, the settings dialog has a switch per optional category, and the footer's **Privacy settings** link reopens it. A browser's Global Privacy Control signal counts as a decline.
- Hosted video, maps and embeds wait for external-media approval, provider URLs are limited to known embed paths, and YouTube uses Privacy Enhanced Mode.
- A default privacy policy at `src/content/pages/privacy.md`, a plain markdown page to rewrite for your site, and a Plausible analytics integration.

#### A reference site for every component

- Every component gets its own documentation page automatically, with a live example, a table of its options and a YAML snippet you can paste into a page. Longer notes and extra examples can be added on top, and a gallery at `/component-docs/` browses the whole library.
- Preview thumbnails for every component in CloudCannon's Add menu, in light and dark.
- The component catalog has a guide to choosing between Grid, Stack, Card Grid, Bento Box and Masonry, and authoring recipes for integration directories, trust metrics and product comparisons.

#### Being found: search, feeds and sharing

- Site search in the navigation bar: a button or Cmd/Ctrl+K opens a modal with results as you type, filters for pages and posts, and thumbnails. Turn it on with `search: true` in the main navigation data. It replaces the old `/search/` page and works locally after `npm run build` (`npm run search:dev` carries the index into `npm run dev`).
- An RSS feed at `/rss.xml`, linked from every page.
- `llms.txt` is generated at build time from the content collections, skipping `noindex` pages.
- Pages and posts carry structured data (title, author, date, tags, breadcrumb trail), and search engines may show large image previews and full snippets.
- Share cards are drawn at build time for every page and post, using the site's logo, fonts and colours, with the entry's own image as the background when it has one. **Share card generation** and **Share card theme** in `seo.json` scope and theme them, and **Share image** sets the site-wide fallback.

#### Tools that catch mistakes before you ship

Most of these catch problems that used to build cleanly while leaving the site
quietly broken in the editor.

- `npm run lint:cms` checks the editor configuration and page content against the components: renamed or missing props, missing files, and scripted components that would be dead in the editor.
- `npm run lint:roots` fails on prop-driven attributes on a component's root element, which go stale when the editor re-renders.
- `npm run lint:schema` checks the editor configuration against CloudCannon's own schema.
- `npm run lint:css-vars` checks that every design token you use exists. A mistyped token fails silently otherwise.
- `npm run icons:sync` and `icons:check` keep the icon picker in step with the icon files.
- `npm run previews:check` catches a missing or stale preview thumbnail, and `npm run previews:montage` renders them all on one sheet.
- `npm run docs:check` checks the documentation against the components.
- Tests: `test:unit`, `test:render` (every component builds), `test:smoke` (a real browser over the built site) and `test:css-parity` (per-page CSS pruning changes no computed style).
- `npm run check:quick` runs the three fastest, most useful checks while you work. `npm run check` is what a finished change has to pass.
- `npm run editor` serves the real CloudCannon editor locally against `dist/`, and `npm run new:component` scaffolds a new component.
- A build fails if two components share a filename, since MDX addresses components by bare filename.
- VS Code autocomplete for the CloudCannon config and the design tokens.
- CI runs every check, including CSS parity and a blocking `npm audit`. Actions are pinned to commit SHAs, the workflow token is read-only, and Dependabot opens grouped weekly updates.

#### New page sections

- **Page Header:** a slim title block for inner pages, with an optional eyebrow, intro and a breadcrumb trail from the URL.
- **Stats:** a row of count-up numbers with labels.
- **Steps Section** and **Timeline Section:** full-width versions of the new Steps and Timeline blocks.
- **Logo Cloud:** a "trusted by" strip of client logos, optionally greyscale or scrolling as a marquee.
- **Testimonial Wall:** quotes as cards in a masonry layout.
- **Testimonial Bento:** quotes in a bento grid, each with its own size and tone, led by a featured quote.
- **Pricing Tiers:** plan cards with features, a highlighted plan and an optional Monthly/Annual toggle.
- **Pricing Comparison:** a feature-by-feature table comparing plans.
- **Contact Split:** contact details beside a form, with an optional map.
- **Latest Posts:** the newest blog posts as cards, optionally filtered by tag.
- **Gallery Grid:** a captioned image grid or masonry, with a lightbox that supports keyboard, swipe and pinch-zoom.
- **Card Collection:** a grid of linked cards with optional covers.
- **Newsletter Signup:** an endpoint-agnostic email form that works without JavaScript.

#### New building blocks

- **Card Grid:** the fixed-column or masonry card layout that Card Collection, Latest Posts and Team Grid share.
- **Masonry:** columns of mixed-height items that keep reading order.
- **Stack:** a row or column of different blocks with one even gap.
- **Steps:** a numbered how-it-works sequence, horizontal or vertical.
- **Timeline:** a dated sequence on a rail, as a vertical list, alternating split or horizontal scroll.
- **Scroll Deck:** cards that stack over each other as the page scrolls, with a rail of anchor links.
- **Scroll Stepper:** steps of text beside sticky media that changes as each step scrolls past.
- **Code Block:** syntax-highlighted code in tabs, with line numbers and a copy button.
- **Alert**, **Badge**, **Rating**, **Table** and **Social Links**.

#### New options

- An announcement bar above the navigation on every page, edited in `src/data/announcementBar.json`. A dismissal lasts until the message changes.
- Mega menus in the main navigation: a `megaMenu` on a top-level item renders a full-width panel on desktop and grouped links on mobile.
- Backgrounds on Card, Custom Section and every page section can be a tiled pattern as well as an image or video, and a `mask` fades part of the background into the background colour. Card and Custom Section backgrounds can stay fixed while the page scrolls.
- Video: autoplay, loop, and WebVTT captions for self-hosted video. Video Modal can open from a poster image.
- Form fields take `hint`, `error` and `autocomplete`, and an invalid form explains itself under the field at fault. Form takes a **Method**, a **Honeypot name** and a **Success message**, shown as a success Alert when the page loads with `?success`.
- A **Heading level** control on every page section with a heading, and on Modal.
- `imageBleed` on Feature Split and Hero Split runs the image to the page edge.
- A `spaceBefore` control on every stackable block, for the space above it.
- Carousel: pause-on-hover, a starting slide, a thumbnail indicator and a slide-change event.
- Toggle: an `offLabel` for a two-sided switch ("Monthly [switch] Annual"), and `inputAttributes` for attributes on the input itself.
- Cards can lock their colour scheme against the visitor's theme toggle, as Custom Section already could.
- Image `decorative`, Button `aria-pressed`, Textarea **Rows**, Testimonial **Avatar size**, Hero Split **Rounded image**, and Social Links **Landmark name**.
- Hero Center **Title width** and CTA Banner **Subtext width**, the same four measures the other sections cap their copy with. The design breaks a hero title well inside the content column, and without a cap a short title ran as one long line.
- CTA Banner takes a second link beside the first, drawn as a text link. One banner in the design carries a pill and "Explore our documentation"; the rest carry one.
- Photo Strip takes a scratched plate per picture, by palette name, so a strip of cut-out portraits reads the way `team-member` draws one. Left out, the picture fills the tile on its own.
- A page for each template at `/templates/<name>/`: the title, its collection, the screenshot, a sidebar carrying the template's generators and its deploy, repository and preview links, and the gallery under its body. The hero shows the template running rather than a screenshot, in a desktop frame with a phone over its corner. It ends with the template before and after it, walked within a collection first and on into the one beside it, wrapping at either end. A starter's page carries a different sidebar: what you'll get, its bonus features, and what is built with it.
- An agency's page carries the generators it works in under its copy, draws its client work as a carousel — the project's name, what they did, the screenshot and a link to the live site — and closes on a form for getting in touch with that agency.
- A **Book a demo** page at `/book-a-demo/`, which the nav and footer already linked to: the demo video, the banner for booking with an expert, and a customer's quote.
- A contact page at `/contact/`, which the footer, nine pages and every agency's page already linked to: the form, and the same **Other resources** row the support page closes on.
- The expert directory at `/experts/`, with a page for each agency at `/experts/<name>/`: the thirteen from the old site, their longer description, the generators they work in, their links, and the client work they show. A new **Expert Grid** section draws the directory. The generator chip wraps rather than running past its card, and Jekyll, Hugo and Eleventy use monochrome glyphs, since the chip masks every mark to one ink and those three carried their detail as a colour.
- A post closes the way the design closes it: the writers' card, then the post's own banner, then further reading. The banner is the post's own, carried over from the old site, so an Astro post closes on Astro and a WordPress comparison on moving off WordPress. Further reading leads with posts in the same category, newest first, topped up with recent ones where a category is thin.
- An `authors` collection at `src/content/authors/`, editable in CloudCannon: a name, a portrait and a bio, which is the file's own body. `npm run blog:port` writes the frontmatter from the old site and leaves bios alone, so a re-port never loses one.
- The hero on a post pools the band's own colour behind the title, the way every other hero on the site does.
- A post's own page opens on the design's dark, ruled band: the category pill and the date beside it, the title, the writers behind their portraits, and the post's picture filling the right half. The tag pills that ran under the body are gone; the design does not draw them. The picture no longer repeats above the body, and the opening paragraph becomes the ruled intro box the design draws.
- The blog listing closes on the same CTA the rest of the site does, on its own pages and on each tag archive. The sections in `blog.md` now split around the listing: the first runs above it, the rest close the page.
- A post names everyone who wrote it: `authors` is a list, and `author` stays for a post written with one. Four of the ported posts carry two names.
- Each blog category is drawn in its own palette colour, Resources in Sunset and Companies in Kiwi as the design has them, and the rest chosen to stay apart. A category with no colour of its own falls back to Earth rather than disappearing. Adding one is a row in `postCategory.mjs`.
- A code sample is drawn the same way wherever it appears: one dark surface and one set of token colours, whether it is a fenced block in markdown, a **Code Block** component, or a sample in the component reference. A fenced block took the highlighter's own baked-in background while the component followed the band it sat on, so two samples in one post could not match.
- Numbered notes against lines of code. A sample marks a line with `^^^1^^^` and a note claims the same number with `data-annotation="1"`; the marker is pulled out before the highlighter sees it, so it never colours a token and never lands on the clipboard, and comes back as a chip at the end of its line. Pressing a chip marks the note that answers it, and resting on a note marks the lines it answers. Carried over from the old site, which drew the same chips.
- A copy button on the fenced code blocks in a post, a template's README and an agency's page, which until now only the Code Block component carried. Both are the same control: one icon, quiet until the pointer or the keyboard reaches it, set in from the same edge, and turning to a tick when the code is on the clipboard.
- Links are prefetched when the pointer rests on them, so the page is already in hand by the time it is clicked.
- The blog listing leads with a carousel of the posts named in its own frontmatter: a `featured` list of slugs, in the order they should show. The track runs the width of the window so the posts either side of the current one show, while a slide stays the width the design draws it.
- The 246 posts from the old site, under the URLs they already had. Their embedded components come across as this project's own: an image becomes **Image**, a YouTube or Vimeo embed becomes **Video**, an annotation becomes **Alert**, and a code component becomes a fenced block. `npm run blog:port` runs it again.
- `npm run templates:readmes` pulls each template's README out of its repository and stores it as that template's body. The old site downloaded them at build time, which made every build need the network and left the text where nobody could edit it.
- A **Large text** style in the rich-text toolbar, for a number that is set larger than the line it sits in — the `$10` in `$10/month (USD)`. The styles CloudCannon offers come from `public/css/editor-styles.css`; `src/styles/utils/_editor-styles.css` paints the same classes on the built page, and the two have to agree.
- **Wide** joins the band's content width: the design's second column, 1180, which it uses for rows of cards and wide tables while the copy stays in the 1040.
- h2 and h3 headings get a linkable id from their text.
- Tag pages show a Home › Blog › tag breadcrumb trail.
- Every page has a "Skip to main content" link.
- Warning status colour tokens, and thin and medium border-width tokens.

### Changed

#### Blog

- Author pages at `/blog/author/<name>/`, reached from a writer's name on a card, in a slide, or in a post's hero.
- A centred carousel never centred its first or last slide: the carousel trims the snaps that would scroll past either end, which with two slides strands one off to the side. Trimming is what a start-aligned gallery wants, so only a centred one opts out. A carousel whose slides all fit on screen also hides its arrows and dots rather than offering controls that move nothing.
- A card marks itself on hover with its category's colour on its edge, the way the template and expert cards do, rather than growing. The post is reached from the picture, the title and the line at the foot, which leaves the category and each writer free to link to their own archives.
- The cards on the blog listing are the ones the design draws: the picture is a sixteen-by-nine band rather than half the card, the category is a coloured pill, everyone who wrote the post appears beside a disc, and the link under the rule is read as text rather than a brand-coloured call to action. The post's description and date are gone from the card; the design leads with the story.
- The listing sits in the design's second column rather than the widest one.
- The demo blog posts the starter shipped with are gone from this site; the 246 ported posts are the blog.

#### Page sections

- A band's content width reads Compact, Default and Wide. "Full" was the 1040 column, which stopped being the widest when Wide was added.

- **Heads-up:** page sections are grouped by the job they do: heroes, explainers (was features and info-blocks), proof (was social-proof and testimonials), conversion (was CTAs, pricing and contact), collections (was blog, galleries and team), and builders. The group is part of each section's path, so existing pages need a find-and-replace, e.g. `page-sections/ctas/cta-center` becomes `page-sections/conversion/cta-center`. The `@features` import alias is now `@explainers`.
- **Heads-up:** Team Grid's start/center layout option is gone. It now uses Card Grid's layout, and a new Team Grid starts with three people.
- Page-section editing panels put content fields first, with the shared settings (width, padding, colour scheme, background) in a collapsed group.
- Pricing Tiers moves Header alignment, Card alignment and Plant a garden to its Style tab, beside the other fields that decide how the band is laid out. Existing pages need those three keys moved from `content:` to `style:`.
- Comparison Table moves Striped to its Style tab, for the same reason. Existing pages need that key moved from `content:` to `style:`.
- Page Header moves Alignment to its Style tab, for the same reason. Existing pages need that key moved from `content:` to `style:`.
- **Heads-up:** Custom Section's Label is now Section Label, the name every other page section uses for the same field. Existing pages need the key renamed from `label:` to `sectionLabel:`.
- **Heads-up:** a scratched band is now a background choice rather than a field of its own: pick the colour with Background colour and tick Scratched beside it. CTA Banner's `scratch:` key is gone, so a page that set it needs `style.backgroundColor` plus `style.scratched: true`. Any band can carry the sheet now, not just this one.
- **Heads-up:** the same goes for every other scratched surface. Stat Panel and Stat Overlay take Panel colour plus Scratched in place of `panelScratch:`; CTA Center takes Picture backing plus Picture backing scratched in place of `imageScratch:`; a photo strip's plate takes Scratched beside its colour. A coloured surface can now be flat or scratched, where a colour used to mean scratches and nothing else.
- **Heads-up:** CTA Banner's two links are an array of Buttons, the same field every hero and CTA already carries, so a band takes as many actions as it needs and each picks its own variant. `linkText`, `link`, `secondaryLinkText`, `secondaryLink` and `buttonVariant` are replaced by `buttonSections`.
- **Heads-up:** CTA Banner's two corner pictures are one field, Pictures, holding Left and Right. They carry no alt text: a corner drawing is a flourish off the band's edge, so it is decorative and the copy beside it says what the band is for. `imageSource`/`imageAlt` and `imageSourceStart`/`imageAltStart` are replaced by `images.left` and `images.right`.
- Vertical padding (top) is no longer offered in the editor. It overrides one end of a band's vertical padding, which is a thing to set by hand where two bands meet, not a second padding control beside the first.

#### Framework and dependencies

- Upgraded to **Astro 7**, with every dependency on its latest release except `prettier-plugin-astro` (pinned to `1.0.0`, as `1.0.1` never converges under `prettier --check`) and TypeScript (held at 6.x for `@typescript-eslint` and `@astrojs/check`).
- Node `engines` is `^22.12.0 || ^24.0.0 || ^26.0.0`, and `.nvmrc` pins `24.18.0`.
- Icons are built in instead of coming from the unmaintained `astro-icon` package. A mistyped icon name warns instead of failing the build.
- The icon and autocomplete lists are CloudCannon datasets under `.cloudcannon/data/`, which takes `cloudcannon.config.yml` from 951 lines to 216.
- Accessibility, SEO, link and performance checks moved to a separate tool outside this repository. Nothing in this repo or its CI catches accessibility regressions any more.
- Agent instructions live in `.agents/skills/`, copied to `.claude/` for Claude Code.

#### Look and feel

- **Heads-up:** spacing between blocks comes from a flow system: each block type has a default space above it, and first children sit flush. A Spacer now replaces the gap between its neighbours rather than adding to it, so existing Spacer gaps render tighter, and some section headings sit further from their content (48px, was 24px).
- **Heads-up:** light-theme link colours are accessible blues that meet contrast requirements. Dark-theme links are unchanged.
- **Heads-up:** the grey tokens are renamed from `--gray-0…12` to `--gray-50…950`, matching every other colour. The colours are identical, and `npm run lint:css-vars` finds any old names you miss.
- **Heads-up:** the colour palette has a full range for all eight colours. Icon background tints, the green and yellow icon colours, and the dark theme's accent backgrounds shift slightly.
- **Heads-up:** layout breakpoints are standardised on 640px and 768px, so a few layouts change shape at slightly different widths.
- Hardcoded values in component CSS (border widths, media overlay colours, easing) are tokens, so re-skinning each is one edit.
- Secondary buttons use the lighter surface fill, and tertiary buttons show a tint of their text colour on hover.
- Focus outlines are consistent everywhere, and a mouse click no longer leaves one behind.
- Video Modal's close control sits above the player, the player is centred, and clicking the overlay closes it. It defaults to extra-large.
- The sticky main nav casts a subtle shadow once it pins, and publishes its height as `--main-nav-height` for anything else that sticks.
- Blog posts open with a back link, title, subtitle and one line for category, date and author, with a 16:9 image, content in one centred column, and tags at the end. Blog listing headings name the list you're looking at.
- Code in blog posts uses the theme's monospace font, and inline code renders as a subtle pill on any background.
- Fonts are served from your own site instead of fetched from Google at build time.
- The placeholder image is a photo glyph on a warm grey field, so it still reads as a stand-in when cropped.
- Component descriptions, docs overviews and prop comments are shorter and worded consistently, in the component library and the editor.
- Demo content is a small product site (home, why, get started), example pages under `/examples/` and a demo blog, with every page section in use on a real page.
- The README leads with the live demo and screenshots, and documents the tooling and deployment.

#### Performance

- Each page ships only the component CSS its own markup uses, once. Inline CSS is 45% smaller on the homepage and 49% site-wide, and total HTML 39.6% smaller, which takes about 1.2s off first and largest contentful paint on a cold Slow 4G load.

#### Authoring and the editor

- **Heads-up:** Grid takes `columns` (`auto`, or `2` to `6`) instead of `layout`. `minItemWidth` and `maxItemWidth` apply to auto columns only, and `maxItemWidth` now caps item width. Centred, content-sized rows (the old `layout: center`) are Stack's job.
- **Heads-up:** Video Modal groups its props into two structures: `type`, `videoId` and `source` move into `media`, and `triggerStyle` and the button and poster fields move into `trigger`.
- **Heads-up:** Input, Textarea, Select, Date, File Upload and Range share one field shell, so their label, hint and error classes are `form-field-*` instead of per-component classes like `input-hint`.
- **Heads-up:** Range no longer takes `required`, which never did anything. Remove it from any content that sets it.
- **Heads-up:** a List item's text is a `<span class="item-text">` rather than an invalid `<p>`. Nothing renders differently.
- **Heads-up:** Hero Split's root class is `hero-split` (was `hero`).
- The editor shows only the fields that apply: a background shows its chosen type's fields, Video and Video Modal their source's, and a List item its icon colour once it has an icon.
- Every slot is either wide (section content, split, stack, carousel slide, content selector panel), which takes everything, or narrow (card, grid item, modal body, accordion panel, step), which takes content blocks only. `npm run lint:nesting` keeps it consistent.
- A freshly inserted block starts in the same state as a composed one, with plausible copy and working links instead of "Heading text" and an empty button.
- Generated ids come from whatever names the thing they belong to instead of a fresh UUID, so builds are reproducible and ids survive an editor re-render.
- A page title drops the site-name suffix rather than running past the length search engines display.
- Hosted YouTube and Vimeo videos load a click-to-play facade, so the full player is fetched only when someone presses play.
- A linked Card uses a stretched link instead of wrapping its contents, so buttons, forms and links inside it stay clickable.
- Modal behaviour (focus trap, scroll lock) attaches to any popover with `data-modal`, and `.modal-popover` is styling only. `ModalShell` and `Modal` take `sheet={false}` for a custom full-screen overlay.
- Grid's numbered columns respond to their container's width, not the viewport.
- The Text block's toolbar no longer offers `h1`. Use the section's **Heading level** instead.
- Team Grid's supporting copy and the footer's legal text accept markdown, the mobile menu's logo is an image picker, and the main nav and footer logos link home.
- Submit no longer offers a "Disabled" switch.

### Removed

- The Component Builder at `/component-docs/component-builder/`. `npm run new:component` scaffolds a new section instead.
- Unused dependencies (`@astrojs/node`, `ajv`, `jszip`, `shiki`, the `@rollup/rollup-*` pins), `ConsentManager.acceptAnalytics()` and `rejectOptional()`, and the legacy `href` nav-button fallback.

### Fixed

#### Blog

- Spacing inside a post came from whatever block sat above: a heading after a panel, a table or a picture got no gap at all, where one after a paragraph got the paragraph's. Every gap is now written on the start of the block below it, so a heading is the same distance down whatever precedes it.
- A picture written as plain HTML in a post ran at the width of the copy, where one placed as an **Image** ran wider.
- A post filed under more than one category showed only the first, so a post tagged Features read as Companies on the Features archive. Every category now shows, in its own colour, and the one being browsed leads. 29 of the 246 posts carry more than one.
- A tag archive was titled, headed and traced by the raw tag, so it read "company" rather than "Companies".
- The blog's own title is a line of copy, which read wrong in a breadcrumb and in the title of every archive built off it. A page can now carry a `shortTitle` for those, and the blog's is "Blog".
- A listing's heading never replaced, so every tag archive and page 2 carried the blog's own h1: the helper looked for a flat `heading` where a section written in the editor nests it under `content`.
- A post's page read `author`, which the port stopped writing when posts gained a list of writers, so every one of them credited "Anonymous".
- A picture written with markdown's own `![](…)` syntax ran at the width of the copy where one written as plain HTML ran wider, because markdown wraps it in a paragraph. 142 of them across the posts.
- The link at the foot of a card sat wherever the title left it, so a row of cards had its three links at three heights. Card gives its content box the height of the whole card, which with a picture above it overflows and is clipped, so nothing inside could reach the floor. The writers still follow the title, which is where the design keeps them.
- A post's body was set in 16 against the design's 19, in a 741 measure against 680, and its markdown headings took the page ramp, which set a heading inside a post at 65 against the design's 29.
- A comparison table in a post was wider than a phone and the overflow was clipped rather than scrolled, so the last column could not be reached at all. The old site wrapped these in a web component; the table now scrolls on its own, and runs to the wider measure a picture does.
- The old site's annotated code block came across as a plain fence, losing the file it names. The four that name one are **Code Block** components again, with the language, the file name and the copy button the old one drew.
- A callout came across without the icon or the tone it chose: the port read its text and discarded `icon_path` and `color`. Heroicons names map to this project's Lucide set the way the inline icons do, and a callout's colour picks the Alert's variant.
- The port dropped 45 of the 67 callouts the old posts carry: its pattern for them required the text in double quotes, and the ones written in single quotes — the ones holding HTML — matched nothing. It now reads them with the same argument parser every other component uses.
- An argument holding a `%`, which a URL does when it escapes a bracket, ended the port's match early and dropped the component. Two pictures came back.
- The old site's two-column block had no conversion at all, so two posts carried the raw Liquid tag as text.
- A ported post whose old permalink ended in a double slash lost its slug and came across with no URL at all. The port now ignores empty path segments.

#### Spacing and colour

- A heading and the copy under it sit 24 apart rather than 8. `.text` carries the tight gap it wants after a sibling of its own kind, which left every band on the site hugging its heading where the design draws air.
- A band's call to action stands 48 off its copy, measured on both the heroes and the closing banners. Scoped to a band's own flow, so a card's button keeps hugging the text it belongs to.
- A card grid under a subtext gets more room above the cards, which is what the design draws when a band has copy as well as a heading.
- A dark band of cards ends 112 above the next band rather than 80, and starts 96 under the last, which is what the design draws on all three of them. Card Grid Section and Pricing Tiers take **Top padding override** and **Bottom padding override** to say so.
- The closing banner on Hosting, Pricing, Migration and Open source tools is back on its own vertical padding. Each set 4xl over the banner's 2xl, which ran the band about 65 taller than the design; Templates and Low maintenance never set it and were already right.
- A chip drawn at full strength on golden, harbour, peachy or blush takes dark ink. White measures 1.81:1 to 2.15:1 on those against the 4.5 small text needs, and dark ink clears it at 5.9 to 7.0. The pairing is shared now, so the template pills and the listing's filters agree.
- A solid icon disc in a light colour draws its glyph in the dark ink, on a dark band as well as a light one. The pairings named `--color-text-strong`, which follows the band, so a golden, harbour, peachy or blush disc on a dark band drew a white glyph on a pale ground.
- The drawing at a banner's starting corner reaches the corner. Its opposite number stretched to the window edge and this one stopped at the content column, leaving it a gutter short.
- A card panel's logo is sized so an upright mark is not half the size of a wide one: the box is wider than it is tall and the mark is contained in it, so at 4rem tall the upright marks came out small beside the wide ones.
- The generated heading weights sit inside `@layer base`. Appended outside it they were unlayered, which beats every layer, so any component setting a heading's weight lost silently — the footer's column headings were drawn semibold against the regular their own rule asked for, and a card's name came out bold.
- Box drawing, arrows and maths signs sit on the cell in a code block. Fragment Mono is loaded latin-only and has none of them, so they were being borrowed from Arial at up to 2.2x the cell width, which folded a directory tree into nonsense.
- A card grid's **Icon background** draws the plate it asks for. The prop was read and then thrown away: the icon was told to draw a plate only when **Solid icon** was on, so a card that asked for the tinted one got no plate at all.
- A centred card stacks its icon over the title rather than beside it, which is what the design draws, and its plate is the design's disc: a lift of the card, round, sized off the glyph.
- One colour themes a card grid's card: its rule, its mark and its link. The link was never coloured and the mark read the accent on its own; a card that carries a panel keeps the site's blue under it, since its colour is the panel.
- A comparison table rules its plan columns apart from the first body row down and leaves the header open, which is what the design draws on both tables that use it. Carried up into the header the rules read as four boxes rather than one row of plans.
- A comparison table draws a rule between every pair of columns. The feature-name cell is a `th`, so the selector that meant to skip it skipped the first plan as well and drew one rule where the design draws three.
- A pricing card's pill is set at 18 when it sits on the card's top edge, which is the size the design draws it and the size the offer card's pill is. The one beside a plan name keeps its own, a step over what the design sets, because the design's 10 is not legible on a screen.
- A card's link is set at 16 rather than 13, which is what the design draws on both grids that carry one.

#### Accessibility

- The navigation menus are labelled and keyboard-operable. The hamburger, close button and dropdown arrows had no names, and the main, mobile and footer navigation now have distinct ones.
- Enter and Space open navigation submenus and side nav groups, desktop dropdowns close when you tab out, and the open mobile menu traps focus and makes the page behind it `inert`.
- Small icon-only controls (mobile menu, carousel arrows, theme toggle) have a 44px tap area.
- Modals hold focus while open, including on embedded players, announce themselves as dialogs, and return focus to the control that opened them.
- Carousels and image carousels announce themselves as carousels, a self-advancing carousel has a Pause control and stops while focused (WCAG 2.2.2), and its indicator dots are keyboard-operable buttons.
- Reduced-motion support covers modal and accordion animations, carousel autoplay, counters and autoplaying video.
- Segments can be operated from the keyboard, and a Toggle is announced as a switch and shows a focus ring.
- Choice Group and Segments mark the group required, not the first checkbox.
- A required field's asterisk is hidden from screen readers, and a field with no label falls back to its placeholder or name for its accessible name.
- Pagination's current page is marked, and is never trimmed out of the visible window.
- Focus rings, control borders and status text colours meet contrast requirements in both themes.
- A Testimonial is a `<figure>` with a `<blockquote>` and `<figcaption>`, and drops empty author rows.
- Content Selector tabs are a named tablist rather than a run of `h3`s, and respond to Enter and Space.
- Range announces its unit with the value ("60 kg").
- Icons are hidden from screen readers, which were announcing thousands of unlabelled graphics.
- The footer's social links are a labelled list, toggles without a visible label fall back to their name, and cards with a background image get a solid backing in case the image fails.

#### Images

- Images offer their own full resolution. Sizes were rounded down to the nearest preset, so a 1181px image only offered 640px and looked soft.
- Full-width section backgrounds loaded blurry in Firefox and Safari.
- Blog listing images drop from 3.7MB to 0.42MB.
- Testimonial author photos fill their circle and ship retina resolutions.
- Images in a section with a locked colour scheme no longer swap to their alternate when the visitor toggles the theme.

#### Forms

- Form renders children passed as slot content. An inverted guard made `<Form><Input /></Form>` render nothing.
- Forms are sent as `multipart/form-data` only when they contain a File Upload.
- Date fields keep their default value and min/max limits.
- Select shows its placeholder instead of preselecting the first option, which satisfied a required Select on load.
- Textarea, Select, Date, File Upload and Toggle no longer emit a duplicate `id` when one is passed in.
- A disabled Input with an icon is styled as disabled.

#### The visual editor

These all built and looked fine, but a field in CloudCannon was missing,
unusable or wrong.

- List fields that showed "not configured", options the editor offered but the component ignored, and options the component supported but the editor never offered, across many components. `lint:cms` now fails on each of these.
- Controls that only appeared after saving (alternate-theme logos, grid alignment) show up on a freshly added block.
- A CTA Banner's heading ran under the drawing in the band's corner instead of wrapping: the drawing is laid over the copy's column rather than beside it, so nothing in the flow knew it was there. The copy now keeps clear of it, by as much as the drawing actually reaches into the column — on a wide page it reaches none of it, because the column is centred and capped while the drawing is pinned to the window. The heading fills its lines rather than evening them out, so it gives way a line at a time.
- Custom Section ignored its own Texture and Texture fade: it reads a whole background instead, so the two settings fell through onto the section element as HTML attributes and the band drew nothing. The Book a demo page gets its peg board back.
- Comparison Table's corner note and corner heading sat inside the row that owns the plan columns, and a region reads its prop path relative to the nearest region above it, so the path was looked for inside the plans array and never found: the editor drew a box no cursor could enter, and the side panel updated nothing. The corner now has a row of its own, spanning both, which leaves it outside that row and changes nothing about where it sits. Both can be typed into on the page, and both follow the side panel as you type.
- A component whose list was emptied in the editor renders instead of failing the build.
- Following a link inside the Visual Editor does a full page load, so the editor knows which page is open.
- Carousels, modals, tabs, galleries and code blocks work in the component library inside the Visual Editor.
- Content Selector items can be selected and dragged on the canvas, top tabs are centred, and a new tab shows its subtext and icon inputs.
- More is editable on the canvas: Accordion item titles, Content Selector titles and subtext, and a Modal's trigger text.
- A Video Modal with the default button trigger renders something to click, and plays in the editor.
- Passing a `class` to Carousel, Accordion, Footer or a Content Selector panel no longer strips the component's own class.
- A Card with its own colour scheme uses that scheme's text colour instead of the surrounding page's.
- Split and Image Carousel survive the editor's re-render, and Image, List and Range no longer put prop-driven attributes on their root element.
- The add-section menu shows each component's preview thumbnail and correct icon, and uploads go to `src/assets/images`.
- The move handle on the first page section is reachable again.
- A Button's text stays visible when "Hide text" is on, since it is the icon-only button's accessible name.
- The Embed and Icon pickers offer only what the component accepts, and Definition List items have one editable region per field.
- Authoring warnings for an unknown Video type, an Image with no alt text, a hosted video with no title and a Button with no link.
- Production builds no longer link to component-library guide pages that only exist in development.

#### Visual and content

- Nav dropdowns stay inside the viewport, close on a second click of their trigger, and no longer carry an invalid `role="button"`.
- A side nav group holding the current page opens without animating, and an entry with no link renders as text.
- The mobile menu binds its Escape handler once and uses the layer scale instead of `z-index: 9999`.
- The theme toggle shows the right icon inside a dark section.
- A background colour no longer paints over a background video.
- Page sections default to the `base` background, so a dark section without one doesn't leave light text on the page colour.
- Counters animate decimal targets at their own precision and no longer reflow on first paint.
- Testimonial quote marks sit outside the quote, even when it starts or ends with formatting.
- Heading icons have their gap back, and Hero Center's subtext size no longer leaks into Hero Split and Feature Split.
- A Bento Box cell's column span is clamped to the grid's column count.
- Switching examples in the component library no longer jumps the page, and nested content no longer prints `[object Object]`.
- Font weights are tokens, and 19 references to tokens that don't exist are fixed.
- Content blocks with no component set log a warning instead of disappearing.
- An invalid `DISABLE_COMPONENT_LIBRARY` value fails the build.
- Nested page files at `src/content/pages/<section>/index.md` resolve to `/<section>/`.
- Stale documentation and counts are corrected.

### Security

- Live sites send browser security headers and a Content-Security-Policy whose `frame-ancestors` allowlist lets the CloudCannon editor embed the page.
- Breadcrumb and blog JSON-LD escape `<`, so a CMS-authored title can't break out of the structured-data script.
- `npm audit` reports 0 advisories, down from 8 (1 critical, 4 high, 3 moderate).

## [1.0.2] - 2026-04-13

### Added

- Light/dark theme toggle — respects system preference, persists choice to localStorage, and prevents flash of wrong theme on load.
- Astro page transitions using `ClientRouter` with a fade animation for smooth navigation between pages.
- Video Modal wrapper component with autoplay on open, pause on close, and support for YouTube, Vimeo, and local video sources.
- Image Carousel wrapper component with thumbnail navigation.
- `alternateSource` prop on the **Image** component — displays an alternate image when the site theme is toggled, useful for swapping logos or diagrams between light and dark mode.
- `size` prop on the **Text** component (xs through 4xl) — sets the font size of paragraphs and lists; headings retain their own sizing.
- `iconColor` prop on Button, Heading, Input, Select, Submit, and Content Selector components.
- New **Range** form component (`building-blocks/forms/range`).
- List items support an optional `link` URL
- Team Grid exposes a `layout` prop.
- Main site header and footer now include a **Components** link to `/component-docs/`.
- Select component displays a custom chevron-down icon replacing the native browser arrow and supports an optional leading `iconName` prop.
- Split, Bento Box, and Grid components now support `none` as a gap option.
- Blog posts now have tags and an archive of all posts with a given tag.
- All page sections that wrap `CustomSection` now accept the same shell props: `sectionLabel`, `maxContentWidth`, `paddingHorizontal`, `paddingVertical`, `colorScheme`, `backgroundColor`, and `background` (image/video with overlay).
- Button and Card `link` fields support a `^popover-id` convention (e.g. `^modal-my-video`) to open a modal via the native Popover API instead of navigating.
- Video component supports `background` mode for rendering decorative looping background video with autoplay, mute, and `prefers-reduced-motion` handling.
- Custom Section and Card `background` object supports an `overlay` value (−1.0 to 1.0) that renders a semi-transparent lighten/darken layer over the background image or video.
- `maxContentWidth` select on Custom Section and Card now includes a **None** option.
- Carousel supports `indicatorStyle="fraction"` to show a slide counter (e.g. `1/3`) instead of dots.
- Modal wrapper now supports an optional header title shown in the sticky top bar.
- Meta keywords: optional `keywords` string arrays in page and blog post frontmatter; when set, output as `<meta name="keywords">`. CloudCannon inputs and new-page/blog schemas include the field.
- Custom `404` page (`404.html` when built) with CloudCannon hosting routing in `.cloudcannon/routing.json` and `X-Robots-Tag: noindex, nofollow` for the error page URL.
- Anchor links on component doc page headings (Overview, Properties, Slots, Examples, and each example group) for deep-linking to specific sections and examples.
- Toggle option for Navs to allow you to have a link on a node and select children.
- Carousel supports a `gap` prop to set the spacing between slides.

### Changed

- **Breaking:** Renamed the Video component's `id` prop to `videoId` to avoid conflicts with the HTML `id` attribute. The same rename applies to the Video Modal component.
- **Breaking:** Button no longer accepts explicit `popovertarget` / `popovertargetaction` props. Pass them as HTML attributes when using `element="button"`, or use the new `^popover-id` link convention instead.
- **Breaking:** Button's `element` prop no longer defaults to `"a"`. The tag is now inferred: `<a>` when `link` is set, `<button>` otherwise. Pass `element` explicitly to override.
- **Breaking:** Standardized layout prop naming — `alignX` → `alignmentHorizontal`, `verticalAlignment` → `alignmentVertical`, Carousel `align` → `alignmentHorizontal`, Modal `header` → `heading`.
- **Breaking:** Custom Section and Card `backgroundImage` / `backgroundVideo` merged into one `background` object (`type`: `image` | `video`, shared position props, `imageSource` / `imageAlt`, `videoSource`).
- Dropped `lightningcss` as the CSS transformer — reverted to Vite's default (PostCSS + esbuild).
- Switched all component `<style>` blocks to `<style is:global>` and removed all `:global()` wrappers.
- Renamed `building-blocks/forms/slider` component to `building-blocks/forms/toggle`.
- **Embed** component now renders iframes in the visual editor`.
- Updated Twitter references to X.
- Video poster images from `src/assets/images` are now optimized with `getImage`, scaled to fit within 1920×1080.
- CloudCannon image uploads default to `src/assets/images` on the `pages` and `blog` collections.
- Blog Content Editor disables the native image toolbar button; authors add images via the Image snippet.
- FeatureGrid heading/text alignment is now configurable via `alignmentHorizontal` instead of being hardcoded to `center`.
- Blog Pagefind wiring markup for published date, author, article type, and tags.
- CloudCannon field comments and component docs now note that selectable UI icons are sourced from [Heroicons](https://heroicons.com/).
- Lowered minimum Node.js version requirement from 24 to 22.
- Default font provider switched from `fontProviders.google()` to `fontProviders.fontsource()` in `site-fonts.mjs`.
- Logo aspect ratios in main nav stay visually balanced across desktop and mobile states.
- Third-level main nav items now use distinct styling to separate from second-level items.
- Text blocks now trim top margin from their first child and bottom margin from their last child.
- Modal examples now use `custom-section` for inner spacing; the modal wrapper no longer applies default body padding.
- Local video sources now automatically include matching sibling formats (`.webm`, `.ogv`).
- Base layout now renders SEO meta tags directly without relying on the `astro-seo` package.
- Blog posts now render `og:type="article"` plus article-specific Open Graph metadata.
- Component library routes (`/component-docs/*`) are excluded from the generated sitemap and use `<meta name="robots" content="noindex">` so they are not indexed as public site content.
- Heading `iconName` and footer social link `icon` selects now use the visual icon picker (with name and SVG preview) instead of a plain dropdown or text input.
- Image component now prepends `sizes="auto"` for lazy-loaded images.

### Fixed

- Component docs mobile nav logo now matches the main site's logo size and nav bar height.
- **Icon** component background color now wraps tightly around the icon instead of stretching full width.
- **ContentSelector** Astro code generation in docs now works correctly — the content-selector-specific branch runs as intended and adds `checked` to the first `ContentSelectorPanel`.
- Main navigation desktop layout now adds spacing between nav links and the header button group via flex `gap`.
- Component docs Astro code tab now renders all named slots from component metadata as `<Fragment slot="...">` children. Fixes Card Before & After examples.
- CloudCannon `data` collection now sets `disable_url: true` so automatic output URL matching does not assign incorrect preview URLs to non-page data files.
- Carousel indicator dots now use presentational `<div>` elements instead of `<button>`, fixing invalid `aria-selected`.
- Navigation dropdown `<label>` triggers no longer use invalid `role="button"`.
- Modal scrollbar now only applies to the body content, keeping the header fixed outside the scroll area.
- List items with icons now align wrapped text to the text column instead of wrapping under the icon.
- Button now forwards link attributes (`target`, `rel`, etc.) and button attributes (`type`, `disabled`, etc.) to the inner element instead of the wrapper.
- Carousel: `loop={false}` now correctly disables Embla loop.
- Opening a modal now locks page scrolling until the modal is closed.
- Image component now always keeps at least one valid responsive width candidate.
- Structured data no longer emits an empty `description` field when the site SEO description has not been set.
- Blog index and tag archive pagination pages now use unique document titles (append “– Page N” for page 2 and up) instead of repeating the first-page title.
- Content selector mobile views
- Excluded the **Pagination** component from being added to components.
- Carousel now works correctly in the CloudCannon visual editor.

## [1.0.1] - 2026-03-19

### Added

- Reset button in Component Builder that clears all state and returns to the Build tab.
- Bento Box component for asymmetric grid layouts where items can span multiple columns and rows.
- Input component now supports optional leading and trailing icons in ACS.
- Font setup is centralized in `site-fonts.mjs` with `SiteFonts.astro`
- Modal component for dialog overlays, using the Popover API with CSS animations and minimal JS for accessibility.
- Button component now supports `popovertarget` and `popovertargetaction` props, forwarding them to the inner element.

### Changed

- Exported Astro components now use scoped `<style>` instead of `<style is:global>`.
- CSS uses Vite's default pipeline (PostCSS for processing, esbuild for minification) instead of opting into Lightning CSS for transform while minifying with esbuild.
- Raised Vite `chunkSizeWarningLimit` to 1024 kB so builds don't warn on expected large chunks (e.g. Shiki in component docs).

### Fixed

- ComponentViewer Astro code preview now renders child items for BentoBox and Masonry components instead of showing self-closing tags.
- Component Builder sandbox delete button styles: replace Sass-style `&-delete` nesting with a flat `.sandbox-item-btn.sandbox-item-btn-delete` selector so esbuild CSS minify doesn't warn on invalid nesting.
- SVGO icon optimization: use `cleanupIds` override (SVGO 4 plugin name) so disabling ID cleanup no longer prints a preset warning at build time.
- Bento Box item column/row span changes now update visually in the CloudCannon editor.
- Icon component no longer exposes an unsupported `4xl` size option.
- Image component no longer converts SVGs to WebP — SVGs are now served as-is.
- Button component no longer relies on `display: contents` on its root wrapper.
- Definition list items no longer rely on `display: contents` on their root wrapper.
- Content selector items now use camelCase `iconName` and `subtext` fields for optional icons and supporting text.
- Heading icons now stay inline with heading text so titles wrap naturally after the icon.
- Heading icons now render at `0.9em` to better match heading text sizing.
- Content selector tabs now keep `aria-selected` and panel `aria-hidden` in sync as panels are switched.
- Content selector top navigation now shows a subtle muted underline on inactive items to match the start navigation style.
- Side navigation now shows the active link underline when `aria-current="page"` is set.
- Fix case where List doesn't work when using slot
