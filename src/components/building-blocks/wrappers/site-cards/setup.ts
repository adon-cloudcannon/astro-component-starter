/**
 * The publish flow on a stack of site cards.
 *
 * The picture is a sequence: the branch holds work the other two have not
 * seen, publishing sends it to staging, and publishing again sends it to
 * production. Nothing is carried between the cards: a dot runs the edge, and
 * the card it arrives at fades to the new screenshot.
 *
 * Everything is measured against the stage rather than the page, so the same
 * code works at any size the container gives it.
 */
type Stage = HTMLElement & { __siteCardsBound?: boolean };

const FLOW = ["branch", "staging", "synced"];

const cardFor = (stage: HTMLElement, env: string) =>
  stage.querySelector<HTMLElement>(`.site-cards-card[data-env="${env}"]`);

const photoOf = (card: HTMLElement | null) =>
  card?.querySelector<HTMLElement>("[data-photo]") ?? null;

/** A box in the stage's own coordinates. */
const boxIn = (stage: HTMLElement, el: HTMLElement) => {
  const a = stage.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return { left: b.left - a.left, top: b.top - a.top, width: b.width, height: b.height };
};

/** How long the dot takes to run an edge, and the cross-fade after it. */
const PULSE = 700;
const FADE = 450;

/**
 * Mark the card the flow is on, which is what draws it in front with the
 * design's heavier rule.
 *
 * Once everything matches there is nothing to act on, so the mark goes to
 * production: it is the card that just received, and the end state still
 * wants somewhere to look.
 */
const markLive = (stage: HTMLElement) => {
  const flow = stage.dataset.flow || "";
  const live = flow === "synced" ? "production" : flow;
  stage.querySelectorAll<HTMLElement>(".site-cards-card").forEach((card) => {
    card.toggleAttribute("data-live", card.dataset.env === live);
  });
};

/**
 * Put the control on the card whose turn it is.
 *
 * As shares of the stage, not pixels: the stage holds its aspect ratio, so a
 * share stays right through a resize without anything having to listen for
 * one.
 */
const moveControl = (stage: HTMLElement) => {
  markLive(stage);

  // `synced` is a state, not a card, so there is nothing left to place.
  const card = cardFor(stage, stage.dataset.flow || "");
  if (!card) return;

  const box = boxIn(stage, card);
  const width = stage.getBoundingClientRect().width || 1;
  const height = stage.getBoundingClientRect().height || 1;
  stage.style.setProperty("--flow-x", `${(box.left / width) * 100}%`);
  stage.style.setProperty("--flow-bottom", `${((box.top + box.height) / height) * 100}%`);
};

/**
 * Run the dot along the edge that is being used.
 *
 * The dot is the edge's own stroke cut to one round dash and walked along
 * with the dash offset, so it follows the curve without anything having to
 * know where the curve goes. The length comes from the path itself.
 */
const runPulse = (stage: HTMLElement, edge: string) => {
  const path = stage.querySelector<SVGPathElement>(`.site-cards-pulse[data-edge="${edge}"]`);
  if (!path || typeof path.getTotalLength !== "function") return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = `0.01 ${length}`;
  path.setAttribute("data-running", "");

  const run = path.animate(
    [{ strokeDashoffset: 0 }, { strokeDashoffset: -length }],
    { duration: PULSE, easing: "cubic-bezier(.4, 0, .2, 1)" }
  );
  run.addEventListener("finish", () => path.removeAttribute("data-running"));
  run.addEventListener("cancel", () => path.removeAttribute("data-running"));
};

/**
 * Hand the branch's screenshot to the card below it.
 *
 * The picture does not travel. The dot on the edge says where the work went,
 * and the card it lands on changes: the new screenshot is laid over the old
 * one and faded up, then the layers are collapsed back to one.
 */
const publish = (stage: Stage) => {
  const from = cardFor(stage, stage.dataset.flow || "");
  const to = cardFor(stage, from?.dataset.next || "");
  const source = photoOf(from);
  const target = photoOf(to);
  if (!from || !to || !source || !target) return;

  const button = stage.querySelector<HTMLButtonElement>("[data-publish]");
  if (button) button.disabled = true;

  runPulse(stage, from.dataset.env || "");

  const arriving = source.innerHTML;

  window.setTimeout(() => {
    const incoming = document.createElement("span");
    incoming.className = "site-cards-incoming";
    incoming.innerHTML = arriving;
    target.append(incoming);

    // One frame for the layer to exist at zero, one for the browser to notice
    // it changed. In a single frame there is nothing to transition from.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => incoming.setAttribute("data-shown", ""));
    });

    window.setTimeout(() => {
      // Collapse back to one picture, so a second publish has a single layer
      // to read and copy.
      target.innerHTML = arriving;
      stage.dataset.flow =
        FLOW[Math.min(FLOW.indexOf(stage.dataset.flow || "") + 1, FLOW.length - 1)];
      moveControl(stage);
      if (button) button.disabled = false;
    }, FADE + 60);
  }, PULSE - 120);
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
