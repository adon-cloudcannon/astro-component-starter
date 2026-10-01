/**
 * The driver for a pinned stepper.
 *
 * It reads one thing: how far the stage has slid inside its runway. That is a
 * property of the band's own geometry and of nothing else, which is the whole
 * point — `scroll-steps` reads each step's position against the middle of its
 * media, so a band whose pictures are still hand exports has a 27px media, no
 * gap ever closes, and the sequence never advances.
 *
 * The bar is stepped rather than scrubbed: it reports which step you are on,
 * so it fills a whole share at a time.
 */
const DESKTOP = "(min-width: 768px)";

type Pinned = HTMLElement & {
  __pinnedStepsOnScroll?: () => void;
  __pinnedStepsQuery?: MediaQueryList;
  __pinnedStepsResize?: ResizeObserver;
};

function setActive(stepper: Pinned, index: number): void {
  for (const selector of [".pinned-steps-panel", ".pinned-steps-step"]) {
    stepper.querySelectorAll<HTMLElement>(selector).forEach((item, itemIndex) => {
      const on = itemIndex === index;

      item.toggleAttribute("data-active", on);
      item.setAttribute("aria-hidden", String(!on));
    });
  }
}

/**
 * How far the stage has slid inside its runway.
 *
 * `offset` is how far it has travelled in pixels and is 0 until the band
 * actually pins, which is what tells the bar it has not been reached yet.
 * `progress` is the same thing as a fraction, and decides which step shows.
 *
 * Both are measured stage-against-runway rather than against the viewport, so
 * the sticky offset never has to be known or resolved here.
 */
function travelOf(stepper: Pinned): { pinned: boolean; progress: number } {
  const stage = stepper.querySelector<HTMLElement>(".pinned-steps-stage");

  if (!stage) return { pinned: false, progress: 0 };

  const runway = stepper.getBoundingClientRect();
  const stageBounds = stage.getBoundingClientRect();
  const travel = runway.height - stageBounds.height;
  // Whether the band has actually been reached, which is what the bar waits
  // for. Not "has the stage moved inside the runway": the stage starts below
  // the runway's top by its own space-before, so that was true before the
  // reader had seen the band at all and the bar was pre-filled on arrival.
  // `top` is a real property, so it resolves to pixels.
  const pin = Number.parseFloat(getComputedStyle(stage).top) || 0;
  const pinned = stageBounds.top <= pin + 1;

  if (travel <= 0) return { pinned, progress: 0 };

  return {
    pinned,
    progress: Math.max(0, Math.min(1, (stageBounds.top - runway.top) / travel)),
  };
}

function teardown(stepper: Pinned): void {
  if (stepper.__pinnedStepsOnScroll) {
    document.removeEventListener("scroll", stepper.__pinnedStepsOnScroll, true);
    stepper.__pinnedStepsOnScroll = undefined;
  }
}

function setupPinnedSteps(stepper: Pinned): void {
  const steps = [...stepper.querySelectorAll<HTMLElement>(".pinned-steps-step")];

  teardown(stepper);

  if (!stepper.__pinnedStepsQuery) {
    const query = window.matchMedia(DESKTOP);

    query.addEventListener("change", () => setupPinnedSteps(stepper));
    stepper.__pinnedStepsQuery = query;
  }

  if (!stepper.__pinnedStepsResize) {
    const observer = new ResizeObserver(() => {
      if (stepper.__pinnedStepsOnScroll) stepper.__pinnedStepsOnScroll();
    });

    observer.observe(stepper);
    stepper.__pinnedStepsResize = observer;
  }

  // Below the breakpoint everything is shown at once, so there is no active
  // step to track and nothing to listen for.
  if (!stepper.__pinnedStepsQuery.matches) {
    steps.forEach((step) => {
      step.removeAttribute("data-active");
      step.removeAttribute("aria-hidden");
    });
    stepper
      .querySelectorAll(".pinned-steps-panel")
      .forEach((panel) => {
        panel.removeAttribute("data-active");
        panel.removeAttribute("aria-hidden");
      });
    return;
  }

  /**
   * One step is always the active one.
   *
   * It used to be swept up with the below-the-breakpoint case and have its
   * `data-active` stripped, which is right down there, where a rule shows
   * every step at once. Up here nothing shows a step but that attribute, so a
   * band with a single step rendered as an empty dark box: the copy was in the
   * DOM, at the right size, at `opacity: 0` and `visibility: hidden`.
   *
   * There is no progress to track with one step, so this returns before the
   * scroll listener the same as that case does.
   */
  if (steps.length < 2) {
    setActive(stepper, 0);
    return;
  }

  const onScroll = (): void => {
    // A ClientRouter navigation discards the band but not this listener, which
    // would keep measuring detached DOM for the rest of the session.
    if (!stepper.isConnected) {
      teardown(stepper);
      return;
    }

    const { progress } = travelOf(stepper);
    // An even share of the runway each. How long a slide lasts is the runway's
    // job, set in one place on the band, rather than something weighted here.
    // The last step holds to the end rather than for a share of it, so the
    // sequence finishes on it instead of flicking past.
    const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));

    setActive(stepper, index);

    // One bar, filled to the step you are on — and the first step is already a
    // share of the way along, because this says where you are rather than how
    // far the slide has loaded. Held at 0 until the band pinned, it climbed
    // from empty to a third on arrival, which reads as the first slide being
    // fetched rather than simply being the first of three.
    //
    // Written as a whole value rather than through a custom property, or the
    // transition never fires and it sticks at whatever it first computed.
    const filled = (index + 1) / steps.length;
    const fill = stepper.querySelector<HTMLElement>(".pinned-steps-progress-fill");

    if (fill) fill.style.clipPath = `inset(0 ${(1 - filled) * 100}% 0 0)`;
  };

  stepper.__pinnedStepsOnScroll = onScroll;
  document.addEventListener("scroll", onScroll, { capture: true, passive: true });
  onScroll();
}

export function setupAllPinnedSteps(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".pinned-steps").forEach((stepper) => {
    setupPinnedSteps(stepper as Pinned);
  });
}
