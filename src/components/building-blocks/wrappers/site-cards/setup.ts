/**
 * The publish flow on a stack of site cards.
 *
 * The picture is a sequence: the branch holds work the other two have not
 * seen, publishing sends it to staging, and publishing again sends it to
 * production. The thing that moves is the screenshot, because that is the
 * part a reader can see change.
 *
 * Everything is measured against the stage rather than the page, so the same
 * code works at any size the container gives it, and the ghost that travels
 * is placed in the stage's own box.
 */
type Stage = HTMLElement & { __siteCardsBound?: boolean };

const FLOW = ["branch", "staging", "synced"];

const cardFor = (stage: HTMLElement, env: string) =>
  stage.querySelector<HTMLElement>(`.site-cards-card[data-env="${env}"]`);

const photoOf = (card: HTMLElement | null) =>
  card?.querySelector<HTMLElement>("[data-photo]") ?? null;

/** A box in the stage's coordinates, which is what the ghost is placed in. */
const boxIn = (stage: HTMLElement, el: HTMLElement) => {
  const a = stage.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return { left: b.left - a.left, top: b.top - a.top, width: b.width, height: b.height };
};

const place = (el: HTMLElement, box: ReturnType<typeof boxIn>) => {
  el.style.setProperty("inset-inline-start", `${box.left}px`);
  el.style.setProperty("inset-block-start", `${box.top}px`);
  el.style.setProperty("inline-size", `${box.width}px`);
  el.style.setProperty("block-size", `${box.height}px`);
};

/**
 * Put the control on the card whose turn it is.
 *
 * As shares of the stage, not pixels: the stage holds its aspect ratio, so a
 * share stays right through a resize without anything having to listen for
 * one.
 */
const moveControl = (stage: HTMLElement) => {
  const card = cardFor(stage, stage.dataset.flow || "");
  if (!card) return;

  const box = boxIn(stage, card);
  const width = stage.getBoundingClientRect().width || 1;
  const height = stage.getBoundingClientRect().height || 1;
  stage.style.setProperty("--flow-x", `${(box.left / width) * 100}%`);
  stage.style.setProperty("--flow-bottom", `${((box.top + box.height) / height) * 100}%`);
};

const publish = (stage: Stage) => {
  const from = cardFor(stage, stage.dataset.flow || "");
  const to = cardFor(stage, from?.dataset.next || "");
  const source = photoOf(from);
  const target = photoOf(to);
  if (!from || !to || !source || !target) return;

  const button = stage.querySelector<HTMLButtonElement>("[data-publish]");
  if (button) button.disabled = true;

  const ghost = document.createElement("div");
  ghost.className = "site-cards-ghost";
  ghost.innerHTML = source.innerHTML;
  place(ghost, boxIn(stage, source));
  stage.append(ghost);

  // Two frames: one for the ghost to take its starting box, one for the
  // browser to notice the change. In one frame the transition never runs and
  // the picture teleports.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => place(ghost, boxIn(stage, target)));
  });

  const land = () => {
    target.innerHTML = source.innerHTML;
    ghost.remove();
    stage.dataset.flow = FLOW[Math.min(FLOW.indexOf(stage.dataset.flow || "") + 1, FLOW.length - 1)];
    moveControl(stage);
    if (button) button.disabled = false;
  };

  // `transitionend` fires per property, so it is taken once and a timer backs
  // it up: a tab that is hidden when the click lands never fires one at all.
  let done = false;
  const once = () => {
    if (done) return;
    done = true;
    ghost.removeEventListener("transitionend", once);
    land();
  };
  ghost.addEventListener("transitionend", once);
  window.setTimeout(once, 1200);
};

export const setupSiteCards = (stage: Stage) => {
  if (stage.__siteCardsBound) return;
  stage.__siteCardsBound = true;

  // What every card started with, so the sequence can be run again.
  const start = new Map<HTMLElement, string>();
  stage.querySelectorAll<HTMLElement>("[data-photo]").forEach((photo) => {
    start.set(photo, photo.innerHTML);
  });
  const first = stage.dataset.flow || FLOW[0];

  stage.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("[data-publish]")) {
      publish(stage);
      return;
    }
    if (target?.closest("[data-reset]")) {
      start.forEach((html, photo) => {
        photo.innerHTML = html;
      });
      stage.dataset.flow = first;
      moveControl(stage);
    }
  });

  moveControl(stage);

  // The control is placed off the card's measured box, so it has to be put
  // back when the stage changes size. One observer per stage.
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => moveControl(stage)).observe(stage);
  }
};

export const setupAllSiteCards = () => {
  document.querySelectorAll<Stage>(".site-cards[data-flow]").forEach(setupSiteCards);
};
