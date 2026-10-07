/**
 * The wall's two columns drift against each other as the band passes.
 *
 * Here rather than in an inline `<script>` because CloudCannon renders a
 * region with `renderToStaticMarkup` and never runs inline scripts, so the
 * wall would sit still in the Visual Editor. `editor-live-sync.js` calls this
 * too.
 *
 * Per column, which is what it always was. The cards used to be dealt into
 * one grid and a card's column worked out from its index modulo the lane
 * count; each column is its own element now, so there are two things to move
 * and no arithmetic to get wrong.
 */
/* The fallback only; the lanes carry the real one so the CSS lift and the
   drift cannot drift apart. */
const RANGE = 72;

type Wall = HTMLElement & { __teamGridDrift?: () => void };

export function setupTeamGrid(wall: Wall): void {
  if (wall.dataset.drifting !== undefined) return;

  const lanes = wall.querySelector<HTMLElement>(".team-grid-lanes");

  if (!lanes) return;

  const columns = [...lanes.querySelectorAll<HTMLElement>(".team-grid-column")];
  const range = parseFloat(getComputedStyle(lanes).getPropertyValue("--team-grid-range")) || RANGE;

  if (columns.length < 2) return;

  wall.dataset.drifting = "";

  /* A reader who asked for less motion gets the wall as the design draws it,
     with the columns offset and still. */
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");

  let frame = 0;
  const update = () => {
    frame = 0;

    if (still.matches) {
      for (const column of columns) column.style.removeProperty("--team-grid-drift");
      return;
    }

    const box = wall.getBoundingClientRect();
    /* -0.5 as the band enters, 0 as it passes the middle, 0.5 as it leaves. */
    const travel = window.innerHeight + box.height;
    const progress = (window.innerHeight / 2 - (box.top + box.height / 2)) / travel;

    columns.forEach((column, index) => {
      /* The left column rises and the right one falls, which is the way round
         it was asked for. */
      const direction = index === 0 ? -1 : 1;

      column.style.setProperty(
        "--team-grid-drift",
        `${(progress * range * direction).toFixed(1)}px`
      );
    });
  };

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  wall.__teamGridDrift = schedule;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  still.addEventListener("change", schedule);
  update();
}

export function setupAllTeamGrids(root: ParentNode = document): void {
  root.querySelectorAll<Wall>(".team-grid-wall").forEach((wall) => setupTeamGrid(wall));
}
