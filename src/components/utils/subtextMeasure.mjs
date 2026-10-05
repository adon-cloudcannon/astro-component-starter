/**
 * The measure a centred subtext is set in.
 *
 * The design draws one per section rather than one for the site: 580 on ten
 * of them, with 342, 446, 460, 480, 489, 560, 573, 579, 602, 612, 646, 672,
 * 808 and 816 elsewhere. Carried through as pixels that was a number field in
 * the editor, which asks an editor to know what 573 means and lets them type
 * 1200.
 *
 * Four measures and the full column instead. Every width the design draws
 * lands within 35 of one of them, which is inside a word either way at these
 * sizes; the one that moves is a 342 on a split, where the copy column is
 * already narrower than the cap.
 */
const MEASURES = {
  sm: "460px",
  md: "580px",
  lg: "680px",
  xl: "820px",
};

/**
 * Takes what the input holds and returns a CSS length, or nothing for the
 * full column.
 *
 * Numbers still resolve, so a measure read straight off the design in a
 * mapping keeps working and old content does not have to be migrated in the
 * same breath as the component.
 */
export function subtextMeasure(value) {
  if (value === undefined || value === null || value === "" || value === "none") return undefined;
  if (MEASURES[value]) return MEASURES[value];

  const px = Number(value);
  return Number.isFinite(px) && px > 0 ? `${px}px` : undefined;
}

/** The id whose measure is nearest a width the design draws. */
export function nearestSubtextMeasure(px) {
  const width = Number(px);
  if (!Number.isFinite(width) || width <= 0) return undefined;

  return Object.keys(MEASURES).reduce((best, id) =>
    Math.abs(parseInt(MEASURES[id], 10) - width) < Math.abs(parseInt(MEASURES[best], 10) - width)
      ? id
      : best,
  );
}

export { MEASURES as SUBTEXT_MEASURES };
