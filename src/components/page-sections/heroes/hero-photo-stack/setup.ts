/**
 * The deck's click behaviour.
 *
 * Here rather than in the component's inline `<script>` because CloudCannon
 * renders a region with `renderToStaticMarkup` and never runs inline scripts,
 * so a deck in the Visual Editor would look like the design and do nothing.
 * `editor-live-sync.js` calls this too.
 */
export function cyclePhotoStack(stack: HTMLElement): void {
  const cards = [...stack.querySelectorAll<HTMLElement>(".photo-stack-card")];
  if (cards.length < 2 || stack.dataset.busy !== undefined) return;

  const front = cards.find((card) => card.dataset.depth === "0");
  if (!front) return;

  stack.dataset.busy = "";
  front.dataset.leaving = "";

  /* Each print moves one place forward and the front one wraps to the back,
     so a pair trades places and three or more run as a cycle. */
  const settle = () => {
    for (const card of cards) {
      const depth = Number(card.dataset.depth) || 0;
      card.dataset.depth = String((depth - 1 + cards.length) % cards.length);
    }
    delete front.dataset.leaving;
    delete stack.dataset.busy;
  };

  /* Out of the way first, then behind: swapping the stacking while the print
     is still in front reads as a cut rather than a shuffle. The reader who
     asked for less motion gets the swap and none of the travel. */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) settle();
  else window.setTimeout(settle, 180);
}

export function setupPhotoStack(stack: HTMLElement): void {
  if (stack.dataset.wired !== undefined) return;
  stack.dataset.wired = "";
  stack.addEventListener("click", () => cyclePhotoStack(stack));
}

export function setupAllPhotoStacks(root: ParentNode = document): void {
  root
    .querySelectorAll<HTMLElement>(".photo-stack[data-interactive]")
    .forEach((stack) => setupPhotoStack(stack));
}
