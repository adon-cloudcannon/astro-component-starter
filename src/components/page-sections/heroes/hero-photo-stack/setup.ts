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

  /* Every print moves one place forward and the one on top wraps to the back,
     so a pair trades places and three or more run as a cycle.
     
     The depths change first and the animation runs afterwards, from where the
     card was to where it now belongs. The card is in the deck's 3D space, so
     it passes under its neighbour because its Z is lower at that moment, not
     because anything swapped: swapping is what made it read as a cut. */
  for (const card of cards) {
    const depth = Number(card.dataset.depth) || 0;
    card.dataset.depth = String((depth - 1 + cards.length) % cards.length);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    delete stack.dataset.busy;
    return;
  }

  /* The one that leaves, and the one it uncovers: they move apart, which is
     what makes it read as a shuffle rather than one print crossing another. */
  const revealed = cards.find((card) => card.dataset.depth === "0");
  front.dataset.shuffling = "";
  if (revealed) revealed.dataset.parting = "";

  const done = () => {
    delete front.dataset.shuffling;
    if (revealed) delete revealed.dataset.parting;
    delete stack.dataset.busy;
    front.removeEventListener("animationend", done);
  };
  front.addEventListener("animationend", done);
  /* A belt for the case where the animation never fires: a deck stuck busy
     would never shuffle again. */
  window.setTimeout(done, 900);
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
