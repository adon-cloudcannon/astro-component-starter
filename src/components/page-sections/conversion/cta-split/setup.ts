/**
 * Swap in a CTA Split's second picture when the section is scrolled to, and
 * let it be swapped back by hand after that.
 *
 * Used by `CtaSplit.astro`'s inline script and by `editor-live-sync.js`, where
 * inline scripts don't run. Without it the section shows the first picture and
 * nothing else happens, which is the right thing to degrade to.
 *
 * An IntersectionObserver rather than a `view()` timeline: the scroll opens it
 * once, and from then on it is the reader's to open and close. A view timeline
 * would keep hold of it and shut it again on the way back up.
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

  const setOpen = (open: boolean) => reveal.setAttribute("aria-pressed", String(open));

  /**
   * Seamless means never cutting to a picture that has not arrived. The second
   * image is lazy, so on a fast scroll it can still be decoding when the band
   * comes into view, and swapping then shows the band through it for a frame
   * or two.
   *
   * Only worth waiting for when nobody asked. `decode()` does not settle at
   * all until the image loads, so gating a *click* on it means a slow or
   * failed picture leaves the reader pressing a button that does nothing —
   * which is exactly what a hidden preview pane produced, where the lazy image
   * is never fetched and the hood would not open however many times it was
   * clicked. A click flips it now and wears the odd first frame.
   */
  const openWhenReady = () => {
    const image = reveal.querySelector<HTMLImageElement>(".cta-split-reveal-top img");

    Promise.resolve(image?.decode?.())
      .catch(() => {})
      .then(() => setOpen(true));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        // The first arrival only. Left connected, scrolling away and back
        // would re-open a picture the reader had just closed by hand.
        observer.disconnect();
        openWhenReady();
      }
    },
    { threshold: reachableThreshold(reveal) },
  );

  observer.observe(reveal);

  reveal.addEventListener("click", () => {
    setOpen(reveal.getAttribute("aria-pressed") !== "true");
  });
}

export function setupAllCtaSplitReveals(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".cta-split-reveal").forEach(setupCtaSplitReveal);
}
