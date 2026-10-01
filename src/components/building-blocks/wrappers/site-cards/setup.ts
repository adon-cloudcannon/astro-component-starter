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
/** The order the work runs in, which is also the order the cards stack in. */
const CHAIN = ["branch", "staging", "production"];

const markLive = (stage: HTMLElement) => {
  const flow = stage.dataset.flow || "";
  const live = flow === "synced" ? "production" : flow;
  const at = CHAIN.indexOf(live);

  stage.querySelectorAll<HTMLElement>(".site-cards-card").forEach((card) => {
    const isLive = card.dataset.env === live;
    card.toggleAttribute("data-live", isLive);

    /**
     * Stack from the card in hand, not from a fixed cascade.
     *
     * A fixed order leaves the marked card behind an unmarked one: staging
     * takes the heavy rule and the branch card still overlaps it. Raising
     * only the live card is worse — the card that has just published drops
     * two places and flips under one it was in front of.
     *
     * So: the live card on top, the one that fed it behind that, and the
     * ones it has not reached yet falling away in the cascade's own order.
     * Nothing moves more than one place at a time.
     */
    const index = CHAIN.indexOf(card.dataset.env || "");
    card.style.zIndex = String(index <= at ? 3 - (at - index) : 3 - index);

    // The card's own control. Only the one with somewhere to publish to can
    // be pressed, which rules out everything once synced.
    const button = card.querySelector<HTMLButtonElement>("[data-publish]");
    if (button) button.disabled = !isLive || !card.dataset.next || flow === "synced";
  });
};

/**
 * Draw the graph from the cards themselves.
 *
 * The edges were written out by hand against the design's measurements, which
 * meant every change to a card's content moved the cards and left the arrows
 * pointing at where they used to be. Taking the boxes at run time costs one
 * measurement per resize and cannot drift.
 *
 * Each edge is the same U: out of the source card's foot 40 left of its
 * middle, down 30, across, and up into the card it feeds 40 right of that
 * one's middle.
 */
const drawEdges = (stage: HTMLElement) => {
  const svg = stage.querySelector<SVGSVGElement>(".site-cards-wire");
  if (!svg) return;

  const rect = stage.getBoundingClientRect();
  if (!rect.width) return;
  // The viewBox is 708 wide and the stage holds its aspect ratio, so one
  // stage pixel is this many of the drawing's units, on both axes.
  const unit = 708 / rect.width;
  const R = 14;

  stage.querySelectorAll<HTMLElement>(".site-cards-card[data-next]").forEach((from) => {
    const to = cardFor(stage, from.dataset.next || "");
    if (!to) return;

    const a = boxIn(stage, from);
    const b = boxIn(stage, to);
    // Left of the source's middle, right of the target's. Started right of
    // centre the run was 304 long — wider than the step between the cards —
    // so it passed under the card in between and crossed the other edge.
    // Inside the middles the two runs are 144 and cannot meet.
    const startX = (a.left + a.width / 2) * unit - 40;
    const endX = (b.left + b.width / 2) * unit + 40;
    const startY = (a.top + a.height) * unit;
    const endY = (b.top + b.height) * unit + 7;
    const floor = startY + 30;

    const line =
      `M${startX} ${startY} V${floor - R} Q${startX} ${floor} ${startX - R} ${floor} ` +
      `H${endX + R} Q${endX} ${floor} ${endX} ${floor - R} V${endY}`;
    const head = `M${endX - 10} ${endY + 16} L${endX} ${endY} L${endX + 10} ${endY + 16}`;

    const edge = from.dataset.env || "";
    svg.querySelectorAll<SVGPathElement>(`[data-edge="${edge}"]`).forEach((path) => {
      path.setAttribute("d", path.dataset.role === "head" ? head : line);
    });
  });
};

/**
 * Put the control on the card whose turn it is.
 *
 * As shares of the stage, not pixels: the stage holds its aspect ratio, so a
 * share stays right through a resize without anything having to listen for
 * one.
 */
/** Everything that has to be put right after the flow moves or the stage resizes. */
const refresh = (stage: HTMLElement) => {
  markLive(stage);
  drawEdges(stage);
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

  // The card's own control, not the stage's first: with one on every card,
  // `stage.querySelector` is production's, and re-enabling that at the end
  // handed a working button to the one environment with nowhere to publish.
  const button = from.querySelector<HTMLButtonElement>("[data-publish]");
  if (button) button.disabled = true;

  runPulse(stage, from.dataset.env || "");

  const arriving = source.innerHTML;
  const next = FLOW[Math.min(FLOW.indexOf(stage.dataset.flow || "") + 1, FLOW.length - 1)];

  window.setTimeout(() => {
    const incoming = document.createElement("span");
    incoming.className = "site-cards-incoming";
    incoming.innerHTML = arriving;
    target.append(incoming);

    // One frame for the layer to exist at zero, one for the browser to notice
    // it changed. In a single frame there is nothing to transition from.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // The arrival is one event, so it is one frame: the new screenshot
        // starts fading up, the rule moves to this card and the stack
        // reorders all on the same tick. Advancing the flow after the fade
        // instead left the picture changing half a second before the card it
        // belongs to looked like the live one.
        incoming.setAttribute("data-shown", "");
        stage.dataset.flow = next;
        refresh(stage);
      });
    });

    window.setTimeout(() => {
      // Collapse back to one picture, so a second publish has a single layer
      // to read and copy.
      target.innerHTML = arriving;
    }, FADE + 90);
  }, PULSE);
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
      refresh(stage);
    }
  });

  refresh(stage);

  // The control is placed off the card's measured box, so it has to be put
  // back when the stage changes size. One observer per stage.
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => refresh(stage)).observe(stage);
  }
};

export const setupAllSiteCards = () => {
  document.querySelectorAll<Stage>(".site-cards[data-flow]").forEach(setupSiteCards);
};
