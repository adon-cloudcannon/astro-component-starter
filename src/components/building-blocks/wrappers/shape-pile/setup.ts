/**
 * Drop a Shape Pile into place when it is scrolled to.
 *
 * Used by `ShapePile.astro`'s inline script and by `editor-live-sync.js`, where
 * inline scripts don't run. The shapes are held invisible until this runs, but
 * only under `@media (scripting: enabled)`, so with no script at all the pile
 * is simply there at rest.
 */

/** How much of the pile has to be on screen before it falls. */
const THRESHOLD = 0.55;

/** The gap between one card touching down and the next, in milliseconds. */
const STAGGER_MS = 95;

/**
 * Lowest edge falls first, which is the whole trick: a card that comes to rest
 * on another has to arrive after it, or it lands on nothing.
 *
 * A placed pile is ranked where it is written, from the coordinates. An auto
 * one has no coordinates to read — the rows are wrapped by the browser — so
 * its order is measured here, once, before anything is let go.
 */
function rankAutoPile(pile: HTMLElement): void {
  const shapes = [...pile.querySelectorAll<HTMLElement>(".shape-pile-shape")];

  shapes
    .map((shape) => ({ shape, bottom: shape.offsetTop + shape.offsetHeight }))
    .sort((a, b) => b.bottom - a.bottom)
    .forEach(({ shape }, position) => {
      shape.style.setProperty("--pile-delay", `${position * STAGGER_MS}ms`);
    });
}

export function setupShapePile(pile: HTMLElement): void {
  // A pile that does not fall has nothing to wait for.
  if (!pile.classList.contains("falls")) return;
  if (pile.hasAttribute("data-pile-initialized")) return;
  pile.setAttribute("data-pile-initialized", "");

  if (pile.classList.contains("is-auto")) rankAutoPile(pile);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        // Once. Left connected, scrolling away and back would throw the pile
        // up in the air again every time it passed.
        observer.disconnect();
        pile.setAttribute("data-fallen", "");
      }
    },
    { threshold: THRESHOLD }
  );

  observer.observe(pile);
}

export function setupAllShapePiles(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".shape-pile").forEach(setupShapePile);
}
