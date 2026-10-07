/**
 * A band's texture, where it fades, and its haze.
 *
 * The builder's `background` is an image, a video or a tiled pattern, each
 * with a focal point, a fade, an overlay and a tile size — nine fields for a
 * decision that is really "which texture, if any". And `haze` is a list of
 * measured pools, which is a number an editor has no way to arrive at.
 *
 * So a section offers a texture by name and a switch, and writes the rest.
 *
 * Three choices, each a plain list: which texture, where it fades out, and
 * whether the heading sits on a pool.
 */
/**
 * Where a texture fades out.
 *
 * `bottom` maps to the builder's `fade` rather than its `bottom`: both ramp
 * downward, but `bottom` holds full strength through the first 30% and reads
 * heavy through the middle, where the design's gradient is a straight ramp.
 * That choice was made once already and is kept here.
 */
const MASKS = { top: "top", bottom: "fade" };

/** The builder's background object, or nothing where the band is bare. */
export function bandPattern(pattern, fade = "none") {
  if (!pattern || pattern === "none") return undefined;

  return {
    type: "pattern",
    pattern,
    fixed: false,
    mask: MASKS[fade] ?? "none",
    overlay: 0,
  };
}

/**
 * One pool of the band's own colour behind the copy.
 *
 * Averaged off the measured pools the pages carried before this: they centre
 * at 0.49 of the width and 50% down, with a 640px horizontal radius on a 1280
 * frame — 50% — and half the band's height. A split offsets it to the copy's
 * own side, the way the heroes do.
 */
export function bandHaze(haze, { reverse = false, split = false } = {}) {
  if (!haze) return false;

  return [{ x: split ? (reverse ? 0.68 : 0.2) : 0.5, y: "50%", rx: "50%", ry: "55%" }];
}
