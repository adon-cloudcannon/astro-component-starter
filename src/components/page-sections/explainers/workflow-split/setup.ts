/**
 * The middle panel's commit feed.
 *
 * One row slides up, the list holds, the next slides on. The loop is seamless
 * because nothing is ever added or removed: after each slide the first row is
 * moved to the end of the same list and the track snaps back to where it
 * started, so eight rows cycle forever without a jump or a second copy.
 *
 * It only runs while the panel is on screen, and not at all for a reader who
 * has asked for less motion — a feed that never stops is exactly the kind of
 * thing that setting is for.
 */
const SLIDE_MS = 450;
const HOLD_MS = 2200;

type Feed = HTMLElement & {
  __workflowFeedTimer?: number;
  __workflowFeedObserver?: IntersectionObserver;
};

function step(track: Feed): void {
  const first = track.firstElementChild;

  if (!first) return;

  track.style.transition = `transform ${SLIDE_MS}ms var(--ease-smooth, ease)`;
  track.style.transform = "translateY(calc(-1 * var(--workflow-row-pitch)))";

  window.setTimeout(() => {
    // Moved, not cloned: the row that just left the top becomes the one
    // waiting at the bottom, and the track returns to 0 in the same frame so
    // the snap is never seen.
    track.style.transition = "none";
    track.style.transform = "none";
    track.append(first);
    // Force the browser to take the reset before the next slide is queued,
    // or the two collapse into one and a row is skipped.
    void track.offsetHeight;
  }, SLIDE_MS);
}

function start(track: Feed): void {
  if (track.__workflowFeedTimer) return;

  track.__workflowFeedTimer = window.setInterval(() => step(track), SLIDE_MS + HOLD_MS);
}

function stop(track: Feed): void {
  if (!track.__workflowFeedTimer) return;

  window.clearInterval(track.__workflowFeedTimer);
  track.__workflowFeedTimer = undefined;
}

function setupFeed(track: Feed): void {
  if (track.children.length < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  track.__workflowFeedObserver?.disconnect();

  // A ClientRouter navigation discards the panel but not the interval, which
  // would keep animating detached DOM for the rest of the session.
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!track.isConnected) {
        stop(track);
        observer.disconnect();
        return;
      }

      if (entry.isIntersecting) start(track);
      else stop(track);
    }
  });

  observer.observe(track);
  track.__workflowFeedObserver = observer;
}

export function setupAllWorkflowFeeds(root: ParentNode = document): void {
  root
    .querySelectorAll<HTMLElement>(".workflow-centre-rows")
    .forEach((track) => setupFeed(track as Feed));
}
