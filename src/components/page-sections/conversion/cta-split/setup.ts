/**
 * Crossfade a CTA Split's second picture in when the section is scrolled to.
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
const THRESHOLD = 0.45;

export function setupCtaSplitReveal(reveal: HTMLElement): void {
  if (reveal.hasAttribute("data-reveal-initialized")) return;
  reveal.setAttribute("data-reveal-initialized", "");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        observer.disconnect();

        // Seamless means never fading to a picture that has not arrived. The
        // second image is lazy, so on a fast scroll it can still be decoding
        // when the section comes into view, and fading then shows the band
        // through it for a frame or two. `decode()` settles either way, so a
        // failure here still swaps rather than leaving the hood shut.
        const image = reveal.querySelector<HTMLImageElement>(".cta-split-reveal-top img");

        Promise.resolve(image?.decode?.())
          .catch(() => {})
          .then(() => reveal.setAttribute("data-revealed", ""));
      }
    },
    { threshold: THRESHOLD },
  );

  observer.observe(reveal);
}

export function setupAllCtaSplitReveals(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".cta-split-reveal").forEach(setupCtaSplitReveal);
}
