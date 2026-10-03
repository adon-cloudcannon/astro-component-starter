/**
 * Syncs DOM changes in the CloudCannon editor to component runtime state.
 *
 * This works around two editor-only quirks:
 *
 *   1. CloudCannon cannot re-render props on a component's root element
 *      (handled via direct style sync, e.g. bento-box spans).
 *   2. CloudCannon's editable-regions uses React's `renderToStaticMarkup`
 *      to render Astro components, which strips inline `<script>` tags.
 *      That means components whose behaviour lives in a client `<script>`
 *      (e.g. Carousel / ImageCarousel Embla setup, Modal focus trap,
 *      Video's consent-gated hosted-player hydration)
 *      never initialise in the editor, so we initialise them here instead.
 *   3. Astro's ClientRouter swaps pages in place, which hides navigation
 *      from CloudCannon, so it is switched off here.
 *
 * Logs editor mutations to the console in dev; silent in production.
 */

import {
  destroyCarousel,
  setupAllCarousels,
  setupCarousel,
} from "./src/components/building-blocks/wrappers/carousel/setup";
import {
  destroyImageCarousel,
  setupAllImageCarousels,
  setupImageCarousel,
} from "./src/components/building-blocks/wrappers/image-carousel/setup";
import {
  MODAL_SELECTOR,
  setupAllModals,
  setupModalShell,
} from "./src/components/building-blocks/wrappers/modal/setup";
import {
  setupAllVideoModals,
  setupVideoModal,
} from "./src/components/building-blocks/wrappers/video-modal/setup";
import { setupAllForms, setupForm } from "./src/components/building-blocks/forms/form/setup";
import { setupAllVideos } from "./src/components/building-blocks/core-elements/video/setup";
import { setupAllCodeBlocks } from "./src/components/building-blocks/core-elements/code-block/setup";
import { setupAllScrollSteppers } from "./src/components/building-blocks/wrappers/scroll-stepper/setup";
import { setupAllTabs } from "./src/components/utils/tabs/setup";
import { setupAllMainNavs } from "./src/components/navigation/main-nav/setup";
import { setupAllSearch, setupSearch } from "./src/components/navigation/search/setup";
import {
  setupAllGalleries,
  setupGallery,
} from "./src/components/page-sections/collections/gallery-grid/setup";
import {
  destroyMasonry,
  setupAllMasonry,
  setupMasonry,
} from "./src/components/building-blocks/wrappers/masonry/setup";
import {
  setupAllScrollDecks,
  setupScrollDeck,
} from "./src/components/building-blocks/wrappers/scroll-deck/setup";

const DEBUG = import.meta.env.DEV;

function log(...args) {
  if (DEBUG) console.log("[editor-live-sync]", ...args);
}

function syncBentoBoxSpans(target) {
  const parent = target.closest(".bento-box-item");

  if (!parent) return;

  const colSpan = Number(target.dataset.colSpan) || 1;
  const rowSpan = Number(target.dataset.rowSpan) || 1;

  parent.style.gridColumn = colSpan > 1 ? `span ${colSpan}` : "";
  parent.style.gridRow = rowSpan > 1 ? `span ${rowSpan}` : "";
}

const BENTO_BOX_ATTRS = ["data-col-span", "data-row-span"];

/**
 * Mirror a component's prop-driven root attributes from a direct child.
 *
 * CloudCannon keeps a region's root element and swaps only its contents, so
 * an attribute on the root whose value comes from a prop never changes in the
 * Visual Editor. Where the attribute can move down, it should: a custom
 * property belongs on whatever reads it, and `:has()` lifts a name back up
 * when the root itself needs it.
 *
 * This is for the rest. A theme, a layout class, a size the CSS keys off: all
 * of them have to resolve on the root, and some cannot be enumerated into one
 * `:has()` rule per value. The component renders the truth on its root as it
 * always did, so the built page is unchanged, and mirrors the same attributes
 * onto a child as JSON. The child is content, so the editor rewrites it, and
 * this copies it back up.
 *
 * `null` removes an attribute, which is how a conditional one comes off.
 */
function syncRootMirror(target) {
  // The parent, always. A mirror is a direct child of the root it describes,
  // which is the only rule that holds for a component nested inside another:
  // walking up to the nearest region found the enclosing page section rather
  // than the component's own root, and a shape pile set its section's styles.
  const root = target.parentElement;

  if (!root) return;

  let attributes;

  try {
    attributes = JSON.parse(target.dataset.rootMirror || "{}");
  } catch {
    log("unparseable data-root-mirror", target);
    return;
  }

  for (const [name, value] of Object.entries(attributes)) {
    // `class` and `style` are maps, never whole values. A root's class list
    // holds the builder's own hooks and its band colour, and its style can
    // hold more than one custom property, so replacing either wholesale would
    // throw away what the component does not know about. Toggling a named
    // flag and setting a named property touch only what was declared.
    if (name === "class" && value && typeof value === "object") {
      for (const [className, on] of Object.entries(value)) {
        root.classList.toggle(className, Boolean(on));
      }
      continue;
    }

    if (name === "style" && value && typeof value === "object") {
      for (const [property, setting] of Object.entries(value)) {
        if (setting === null || setting === undefined) {
          root.style.removeProperty(property);
        } else {
          root.style.setProperty(property, String(setting));
        }
      }
      continue;
    }

    if (value === null || value === undefined) {
      root.removeAttribute(name);
    } else {
      root.setAttribute(name, String(value));
    }
  }
}

const ROOT_MIRROR_ATTRS = ["data-root-mirror"];


/**
 * Carousel config is read from attributes on `.carousel-inner` at
 * Embla init time, so any change to those attributes, the inline
 * style (CSS vars like `--slide-width`), or the slide list requires
 * a full destroy + re-init of the Embla instance.
 */
const CAROUSEL_INNER_ATTRS = [
  "data-show-indicators",
  "data-show-arrows",
  "data-loop",
  "data-align",
  "data-slides-to-scroll",
  "data-autoplay",
  "data-pause-on-hover",
  "data-autoscroll",
  "style",
];

/**
 * ImageCarousel only reads `data-loop` from its root for Embla config.
 * Image list and arrow visibility are rendered conditionally, so those
 * are handled via childList mutations below.
 */
const IMAGE_CAROUSEL_CONTENT_ATTRS = ["data-loop"];

function makeResetScheduler({ destroy, init, label }) {
  const pending = new Set();
  let scheduled = false;

  function queue(el, reason) {
    if (!el) return;

    log(`queue ${label} reset:`, reason, el);
    pending.add(el);

    if (scheduled) return;
    scheduled = true;

    requestAnimationFrame(() => {
      scheduled = false;

      const items = [...pending];

      pending.clear();

      for (const target of items) {
        if (!target.isConnected) {
          log(`skipping detached ${label}`, target);
          continue;
        }

        log(`destroying + re-initialising ${label}`, target);
        destroy(target);
        init(target);
      }
    });
  }

  return queue;
}

const queueCarouselReset = makeResetScheduler({
  destroy: destroyCarousel,
  init: setupCarousel,
  label: "carousel",
});

const queueImageCarouselReset = makeResetScheduler({
  destroy: destroyImageCarousel,
  init: setupImageCarousel,
  label: "image-carousel",
});

/**
 * The re-render keeps `.masonry` but replaces its items and strips the
 * attributes the enhancement set on it — so the layout CSS switches off while
 * observers stay bound to items that no longer exist. Rebuild it from scratch.
 */
const queueMasonryReset = makeResetScheduler({
  destroy: destroyMasonry,
  init: setupMasonry,
  label: "masonry",
});

function initNewComponents(root) {
  if (root.nodeType !== Node.ELEMENT_NODE) return;

  const newCarousels = [];

  if (root.classList?.contains("carousel") && !root.hasAttribute("data-embla-initialized")) {
    newCarousels.push(root);
  }

  root
    .querySelectorAll(".carousel:not([data-embla-initialized])")
    .forEach((el) => newCarousels.push(el));

  for (const el of newCarousels) {
    log("initialising new carousel", el);
    setupCarousel(el);
  }

  const newImageCarousels = [];

  if (root.classList?.contains("image-carousel") && !root.hasAttribute("data-embla-initialized")) {
    newImageCarousels.push(root);
  }

  root
    .querySelectorAll(".image-carousel:not([data-embla-initialized])")
    .forEach((el) => newImageCarousels.push(el));

  for (const el of newImageCarousels) {
    log("initialising new image-carousel", el);
    setupImageCarousel(el);
  }

  const newModals = [];

  if (root.matches?.(MODAL_SELECTOR) && !root.hasAttribute("data-modal-initialized")) {
    newModals.push(root);
  }

  root
    .querySelectorAll(`${MODAL_SELECTOR}:not([data-modal-initialized])`)
    .forEach((el) => newModals.push(el));

  for (const el of newModals) {
    log("initialising new modal", el);
    setupModalShell(el);

    if (el.closest(".video-modal")) {
      log("initialising new video modal", el);
      setupVideoModal(el);
    }
  }

  const newSearch = [];

  if (root.classList?.contains("search") && !root.hasAttribute("data-search-initialized")) {
    newSearch.push(root);
  }

  root
    .querySelectorAll(".search:not([data-search-initialized])")
    .forEach((el) => newSearch.push(el));

  for (const el of newSearch) {
    log("initialising new search", el);
    setupSearch(el);
  }

  const newGalleries = [];

  // The editor keeps `.gallery-grid` and swaps its contents, so the added node
  // holding a fresh lightbox is usually inside the gallery, not the gallery.
  const enclosingGallery = root.closest?.(".gallery-grid");

  if (enclosingGallery) {
    newGalleries.push(enclosingGallery);
  }

  root.querySelectorAll(".gallery-grid").forEach((el) => newGalleries.push(el));

  for (const el of newGalleries) {
    log("initialising new gallery", el);
    setupGallery(el);
  }

  const newMasonry = [];

  if (root.classList?.contains("masonry") && !root.hasAttribute("data-masonry-initialized")) {
    newMasonry.push(root);
  }

  root
    .querySelectorAll(".masonry:not([data-masonry-initialized])")
    .forEach((el) => newMasonry.push(el));

  for (const el of newMasonry) {
    log("initialising new masonry", el);
    setupMasonry(el);
  }

  const newForms = [];

  if (root.classList?.contains("form") && !root.hasAttribute("data-form-initialized")) {
    newForms.push(root);
  }

  root
    .querySelectorAll("form.form:not([data-form-initialized])")
    .forEach((el) => newForms.push(el));

  for (const el of newForms) {
    log("initialising new form", el);
    setupForm(el);
  }

  const newScrollDecks = [];

  if (root.classList?.contains("scroll-deck")) {
    newScrollDecks.push(root);
  }

  root.querySelectorAll(".scroll-deck").forEach((el) => newScrollDecks.push(el));

  for (const el of newScrollDecks) {
    log("initialising new scroll deck", el);
    setupScrollDeck(el);
  }

  setupAllVideos(root);
  setupAllTabs(root);
  setupAllCodeBlocks(root);
  setupAllScrollSteppers(root);
}

// CloudCannon tracks the page through real navigations; ClientRouter's in-place
// swaps hide them. The router skips `data-astro-reload` elements, and without
// its meta tag back/forward reload normally.
function disableClientRouter() {
  document.querySelector('meta[name="astro-view-transitions-enabled"]')?.remove();
  document.addEventListener(
    "click",
    (event) => {
      if (event.target instanceof Element) {
        event.target.closest("a, area")?.setAttribute("data-astro-reload", "");
      }
    },
    true
  );
  document.addEventListener(
    "submit",
    (event) => {
      if (event.target instanceof HTMLFormElement) {
        event.target.setAttribute("data-astro-reload", "");
      }
    },
    true
  );
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const { type, target, attributeName } = mutation;

    if (type === "attributes") {
      if (BENTO_BOX_ATTRS.includes(attributeName)) {
        syncBentoBoxSpans(target);
        continue;
      }

      if (ROOT_MIRROR_ATTRS.includes(attributeName)) {
        syncRootMirror(target);
        continue;
      }

      if (!(target instanceof Element)) continue;

      if (
        CAROUSEL_INNER_ATTRS.includes(attributeName) &&
        target.classList.contains("carousel-inner")
      ) {
        queueCarouselReset(target.closest(".carousel"), `attr:${attributeName}`);
        continue;
      }

      if (
        IMAGE_CAROUSEL_CONTENT_ATTRS.includes(attributeName) &&
        target.classList.contains("carousel-content")
      ) {
        queueImageCarouselReset(target.closest(".image-carousel"), `attr:${attributeName}`);
        continue;
      }
    }

    if (type === "childList") {
      if (target instanceof Element) {
        if (target.classList.contains("track")) {
          queueCarouselReset(target.closest(".carousel"), "slides changed");
        }

        if (target.classList.contains("main-track") || target.classList.contains("thumbs-strip")) {
          queueImageCarouselReset(target.closest(".image-carousel"), "images changed");
        }

        if (target.classList.contains("image-carousel")) {
          // showArrows toggles .arrow-prev / .arrow-next in/out
          queueImageCarouselReset(target, "arrows toggled");
        }

        const masonryRoot = target.closest(".masonry");

        if (masonryRoot) {
          queueMasonryReset(masonryRoot, "items changed");
        }
      }

      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;

        if (node.dataset?.colSpan || node.dataset?.rowSpan) {
          syncBentoBoxSpans(node);
        }

        for (const child of node.querySelectorAll("[data-col-span], [data-row-span]")) {
          syncBentoBoxSpans(child);
        }

        if (node.dataset?.rootMirror) syncRootMirror(node);

        for (const child of node.querySelectorAll("[data-root-mirror]")) {
          syncRootMirror(child);
        }

        initNewComponents(node);
      }
    }
  }
});

observer.observe(document.body, {
  attributes: true,
  attributeFilter: [
    ...BENTO_BOX_ATTRS,
    ...ROOT_MIRROR_ATTRS,
    ...CAROUSEL_INNER_ATTRS,
    ...IMAGE_CAROUSEL_CONTENT_ATTRS,
  ],
  childList: true,
  subtree: true,
});

disableClientRouter();
setupAllCarousels();
setupAllImageCarousels();
setupAllMainNavs();
setupAllModals();
setupAllVideoModals();
setupAllSearch();
setupAllGalleries();
setupAllMasonry();
setupAllScrollDecks();
setupAllVideos();
setupAllTabs();
setupAllCodeBlocks();
setupAllScrollSteppers();
setupAllForms();

// Everything already on the page, before the editor changes anything.
document.querySelectorAll("[data-root-mirror]").forEach(syncRootMirror);

log("observer active", {
  bentoAttrs: BENTO_BOX_ATTRS,
  rootMirrorAttrs: ROOT_MIRROR_ATTRS,
  carouselAttrs: CAROUSEL_INNER_ATTRS,
  imageCarouselAttrs: IMAGE_CAROUSEL_CONTENT_ATTRS,
});
