/**
 * A band's texture and its haze, from one choice each.
 *
 * The builder's `background` is an image, a video or a tiled pattern, each
 * with a focal point, a fade, an overlay and a tile size — nine fields for a
 * decision that is really "which texture, if any". And `haze` is a list of
 * measured pools, which is a number an editor has no way to arrive at.
 *
 * So a section offers a texture by name and a switch, and writes the rest.
 *
 * The fade is part of the name rather than a field of its own. The design
 * fades a pattern out on about half the bands that carry one, and dropping it
 * would have flattened twenty of them — a visible loss for a field nobody
 * wanted to set. Picking "Grid, faded" keeps it without adding a second
 * control.
 */
const MASKS = { "grid-fade": "fade", "pegboard-fade": "fade", "grid-top": "top" };
const TILES = {
  grid: "grid",
  "grid-fade": "grid",
  "grid-top": "grid",
  pegboard: "pegboard",
  "pegboard-fade": "pegboard",
};

/** The builder's background object, or nothing where the band is bare. */
export function bandPattern(pattern) {
  const tile = TILES[pattern];

  if (!tile) return undefined;

  return { type: "pattern", pattern: tile, fixed: false, mask: MASKS[pattern] ?? "none", overlay: 0 };
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
