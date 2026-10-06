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

export function setupShapePile(pile: HTMLElement): void {
  // A pile that does not fall has nothing to wait for.
  if (!pile.classList.contains("falls")) return;
  if (pile.hasAttribute("data-pile-initialized")) return;
  pile.setAttribute("data-pile-initialized", "");

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
    { threshold: THRESHOLD },
  );

  observer.observe(pile);
}

export function setupAllShapePiles(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".shape-pile").forEach(setupShapePile);
}
