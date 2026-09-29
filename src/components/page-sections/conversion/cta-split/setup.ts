/**
 * Swap in a CTA Split's second picture when the section is scrolled to.
 *
 * Used by `CtaSplit.astro`'s inline script and by `editor-live-sync.js`, where
 * inline scripts don't run. Without it the section shows the first picture and
 * nothing else happens, which is the right thing to degrade to.
 *
 * An IntersectionObserver rather than a `view()` timeline: this is a one-way
 * switch, not something that should run backwards as the reader scrolls up,
 * and a view timeline would tie the hood to the exact scroll position rather
 * than letting it open at its own pace.
 */

/** How much of the picture has to be on screen before it changes. */
const THRESHOLD = 0.8;

/**
 * The most of the viewport the picture is assumed to be able to fill.
 *
 * A threshold is a share of the element, so one this high can never be met by
 * something taller than the screen and the hood would simply never open. The
 * ask is only ever "most of it", so on a picture that big the share is brought
 * down to whatever a full screen of it would be.
 */
const MOST_OF_SCREEN = 0.85;

function reachableThreshold(reveal: HTMLElement): number {
  const height = reveal.getBoundingClientRect().height;

  if (!height) return THRESHOLD;

  return Math.min(THRESHOLD, (window.innerHeight * MOST_OF_SCREEN) / height);
}

export function setupCtaSplitReveal(reveal: HTMLElement): void {
  if (reveal.hasAttribute("data-reveal-initialized")) return;
  reveal.setAttribute("data-reveal-initialized", "");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        observer.disconnect();

        // Seamless means never cutting to a picture that has not arrived. The
        // second image is lazy, so on a fast scroll it can still be decoding
        // when the section comes into view, and swapping then shows the band
        // through it for a frame or two. `decode()` settles either way, so a
        // failure here still swaps rather than leaving the hood shut.
        const image = reveal.querySelector<HTMLImageElement>(".cta-split-reveal-top img");

        Promise.resolve(image?.decode?.())
          .catch(() => {})
          .then(() => reveal.setAttribute("data-revealed", ""));
      }
    },
    { threshold: reachableThreshold(reveal) },
  );

  observer.observe(reveal);
}

export function setupAllCtaSplitReveals(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".cta-split-reveal").forEach(setupCtaSplitReveal);
}
