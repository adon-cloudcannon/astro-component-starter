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
  const groups = [
    [...stepper.querySelectorAll<HTMLElement>(".pinned-steps-panel")],
    [...stepper.querySelectorAll<HTMLElement>(".pinned-steps-step")],
    [...stepper.querySelectorAll<HTMLElement>(".pinned-steps-progress-segment")],
  ];

  for (const group of groups) {
    group.forEach((item, itemIndex) => {
      // The bar fills up to and including the step you are on; the columns
      // show only it.
      const on = item.classList.contains("pinned-steps-progress-segment")
        ? itemIndex <= index
        : itemIndex === index;

      item.toggleAttribute("data-active", on);
      if (!item.classList.contains("pinned-steps-progress-segment")) {
        item.setAttribute("aria-hidden", String(!on));
      }
    });
  }
}

/** How far the stage has travelled inside the runway, 0 to 1. */
function progressOf(stepper: Pinned): number {
  const stage = stepper.querySelector<HTMLElement>(".pinned-steps-stage");

  if (!stage) return 0;

  const runway = stepper.getBoundingClientRect();
  const stageBounds = stage.getBoundingClientRect();
  // Measured stage-against-runway rather than against the viewport, so the
  // sticky offset never has to be known or resolved here.
  const travel = runway.height - stageBounds.height;

  if (travel <= 0) return 0;

  return Math.max(0, Math.min(1, (stageBounds.top - runway.top) / travel));
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
  if (steps.length < 2 || !stepper.__pinnedStepsQuery.matches) {
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

  const onScroll = (): void => {
    // A ClientRouter navigation discards the band but not this listener, which
    // would keep measuring detached DOM for the rest of the session.
    if (!stepper.isConnected) {
      teardown(stepper);
      return;
    }

    const progress = progressOf(stepper);
    // The last step holds to the end rather than for a share of the runway, so
    // the sequence finishes on it instead of flicking past.
    const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));

    setActive(stepper, index);
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
