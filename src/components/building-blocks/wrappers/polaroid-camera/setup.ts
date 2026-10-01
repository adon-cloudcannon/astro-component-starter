/**
 * The shutter.
 *
 * Click the camera, the screen flashes, a polaroid drops onto the pile. The
 * pictures are cloned from templates the build already optimised, so nothing
 * is fetched at the moment of the click.
 *
 * Used by `PolaroidCamera.astro`'s inline script and by `editor-live-sync.js`,
 * where inline scripts do not run.
 */

/** How long the flash lasts, matching the keyframe. */
const FLASH = 200;
/** Nothing can fire faster than this, so the screen cannot strobe. */
const COOLDOWN = 320;

/**
 * Where prints land, as the top left of each one against the camera's box.
 *
 * Written down rather than random so the same click always gives the same
 * picture in the same place, which is what makes it feel made rather than
 * scattered by a dice roll. Kept clear of the lens, and in the lower half,
 * where the design already draws a print coming out of the slot.
 */
const SPOTS = [
  { x: 5, y: 78, spin: -5 },
  { x: 32, y: 92, spin: 3 },
  { x: 59, y: 74, spin: -2 },
  { x: 82, y: 96, spin: 6 },
];

/**
 * One print per shot and no repeats: four pictures, four places, then the
 * film is used up and the shutter stops being a target. Cycling looked like a
 * loop rather than a roll, and a fifth print had nowhere of its own to land.
 */

export function setupPolaroidCamera(root: HTMLElement): void {
  if (root.hasAttribute("data-camera-initialized")) return;
  root.setAttribute("data-camera-initialized", "");

  const shutter = root.querySelector<HTMLButtonElement>(".polaroid-camera-shutter");
  const pile = root.querySelector<HTMLElement>(".polaroid-camera-pile");
  const rolls = [...root.querySelectorAll<HTMLTemplateElement>("template[data-shot]")];
  if (!shutter || !pile || !rolls.length) return;

  const still = window.matchMedia("(prefers-reduced-motion: reduce)");

  let at = 0;
  /** How many have been taken, which decides where the next one lands. */
  let taken = 0;
  let busy = false;

  const flash = () => {
    // Asked at the moment of the click rather than once at startup, because
    // this is the setting where changing it mid-session actually matters.
    if (still.matches) return;
    const sheet = document.createElement("div");
    sheet.className = "polaroid-flash";
    document.body.append(sheet);
    // Removed on its own, and on a timer as well: a tab that is backgrounded
    // mid-animation never fires `animationend`, and a white sheet left over
    // the page is worse than no flash at all.
    const clear = () => sheet.remove();
    sheet.addEventListener("animationend", clear, { once: true });
    setTimeout(clear, FLASH + 400);
  };

  shutter.addEventListener("click", () => {
    // Locked out while one is in flight, so no amount of clicking can make
    // the screen strobe.
    if (busy || at >= rolls.length) return;
    busy = true;
    setTimeout(() => {
      busy = false;
    }, COOLDOWN);

    flash();

    const roll = rolls[at];
    at += 1;
    // The last one used it up.
    if (at >= rolls.length) shutter.disabled = true;

    const shot = roll.content.firstElementChild?.cloneNode(true) as HTMLElement | undefined;
    if (!shot) return;

    // Where it lands. One spot per print, so none of them overlap by accident
    // and the pile reads as laid out rather than dropped.
    const spot = SPOTS[taken % SPOTS.length];
    shot.style.setProperty("--x", `${spot.x}%`);
    shot.style.setProperty("--y", `${spot.y}%`);
    shot.style.setProperty("--spin", `${spot.spin}deg`);
    shot.style.setProperty("--at", String(taken + 1));
    taken += 1;

    shot.classList.add("is-new");
    // The class is only there to run the drop once. Left on, every polaroid
    // would replay it the next time the browser recalculated them.
    shot.addEventListener("animationend", () => shot.classList.remove("is-new"), { once: true });
    pile.append(shot);
  });
}

export function setupAllPolaroidCameras(scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>("[data-polaroid-camera]").forEach(setupPolaroidCamera);
}
