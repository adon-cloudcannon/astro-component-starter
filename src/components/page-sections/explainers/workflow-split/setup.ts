/**
 * The middle panel's commit feed, and the pulses that feed it.
 *
 * A dot runs the connector from one of the side cards to the panel between
 * them, and the commit it is carrying lands the moment it arrives: the row
 * slides up, the list holds, and the next pulse sets off from whichever side
 * owns the commit after that. So the timing reads as cause and effect rather
 * than two things animating near each other.
 *
 * Which side fires is read off the row that is about to arrive, not alternated
 * — the design's order is editor, dev, editor, dev, editor, editor, dev, dev,
 * and two in a row from the same side is the point of it.
 *
 * The loop is seamless because nothing is added or removed: after each slide
 * the row that left the top is moved to the end of the same list and the track
 * snaps back to 0 in the same frame.
 */
// The dot keeps going once it reaches the gap's end, sliding under the card
// between the panels rather than stopping against its edge.
const OVERLAP_PX = 44;
const TRAVEL_MS = 1100;
const SLIDE_MS = 450;
const HOLD_MS = 1350;

type Feed = HTMLElement & {
  __workflowTimer?: number;
  __workflowObserver?: IntersectionObserver;
  __workflowRunning?: boolean;
};

const reduceMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Run the dot along its line, from the panel's card to the one in the middle.
 *
 * Returns how long until it reaches the card's edge, which is earlier than the
 * end of its run: the last stretch is spent sliding underneath. The commit
 * lands on arrival rather than on the animation finishing, so the row appears
 * as the dot goes under instead of after it has gone.
 */
function pulse(connector: HTMLElement): number {
  const dot = connector.querySelector<HTMLElement>(".workflow-pulse");

  if (!dot) return 0;

  // Centre to centre: the dot rests centred on the line's start, so the line's
  // own width is the distance between its two ends, and the overlap carries it
  // on underneath the card rather than stopping against it. `to-start`
  // connectors run the other way — their outer end is the far side, because
  // the card between them is to their left — so there the overlap is negative.
  const span = connector.getBoundingClientRect().width;
  const toMiddle = connector.classList.contains("to-end");
  const from = toMiddle ? 0 : span;
  const to = toMiddle ? span + OVERLAP_PX : -OVERLAP_PX;

  const at = (t: number): string => `${from + (to - from) * t}px -50%`;

  // One size the whole way, matching the line's own end dots. Linear too: it
  // is a thing travelling a wire, not a thing being eased into place, and an
  // ease-out made it look like it was running out of steam just as it reached
  // the card.
  const animation = dot.animate(
    [
      { offset: 0, translate: at(0), opacity: 0 },
      { offset: 0.08, translate: at(0.08), opacity: 1 },
      { offset: 1, translate: at(1), opacity: 1 },
    ],
    { duration: TRAVEL_MS, easing: "linear" },
  );

  // The line's own length as a share of the whole run, which is the point the
  // dot crosses the card's edge.
  return TRAVEL_MS * (span / (span + OVERLAP_PX));
}

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

/** Slide the feed up by one row and put the one that left back at the end. */
function slide(track: HTMLElement): Promise<void> {
  const first = track.firstElementChild;

  if (!first) return Promise.resolve();

  track.style.transition = `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  track.style.transform = "translateY(calc(-1 * var(--workflow-row-pitch)))";

  return new Promise((resolve) => {
    window.setTimeout(() => {
      // Moved, not cloned, and reset in the same frame so the snap is unseen.
      track.style.transition = "none";
      track.style.transform = "none";
      track.append(first);
      void track.offsetHeight;
      resolve();
    }, SLIDE_MS);
  });
}

async function cycle(row: Feed): Promise<void> {
  const track = row.querySelector<HTMLElement>(".workflow-centre-rows");

  if (!track || !row.isConnected) return;

  const next = track.firstElementChild;
  const kind = next?.classList.contains("kind-dev") ? "dev" : "editor";
  const connector = row.querySelector<HTMLElement>(`.workflow-connector[data-kind="${kind}"]`);

  // Not awaited: the dot carries on under the card while the row it delivered
  // is still sliding into place.
  if (connector) await wait(pulse(connector));
  if (!row.isConnected) return;

  await slide(track);
}

function start(row: Feed): void {
  if (row.__workflowTimer) return;

  const tick = async (): Promise<void> => {
    if (row.__workflowRunning) return;

    row.__workflowRunning = true;
    await cycle(row);
    row.__workflowRunning = false;
  };

  row.__workflowTimer = window.setInterval(tick, TRAVEL_MS + SLIDE_MS + HOLD_MS);
  void tick();
}

function stop(row: Feed): void {
  if (!row.__workflowTimer) return;

  window.clearInterval(row.__workflowTimer);
  row.__workflowTimer = undefined;
}

function setupRow(row: Feed): void {
  const track = row.querySelector<HTMLElement>(".workflow-centre-rows");

  if (!track || track.children.length < 2) return;
  if (reduceMotion()) return;

  row.__workflowObserver?.disconnect();

  // A ClientRouter navigation discards the section but not the interval, which
  // would animate detached DOM for the rest of the session.
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!row.isConnected) {
        stop(row);
        observer.disconnect();
        return;
      }

      if (entry.isIntersecting) start(row);
      else stop(row);
    }
  });

  observer.observe(row);
  row.__workflowObserver = observer;
}

export function setupAllWorkflowFeeds(root: ParentNode = document): void {
  root
    .querySelectorAll<HTMLElement>(".workflow-columns")
    .forEach((row) => setupRow(row as Feed));
}
