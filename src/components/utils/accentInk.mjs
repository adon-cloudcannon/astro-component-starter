/**
 * The ink that reads on a palette colour at full strength.
 *
 * Measured rather than judged. White fails WCAG AA on four of them — golden
 * is 1.91:1 against the 4.5 small text needs — and dark ink clears it on all
 * four, 5.9 to 7.0. They are the same four `Icon.astro` pairs with dark ink
 * on a solid disc; this is that pairing where a colour arrives as a value
 * rather than a class.
 *
 * Sunset reaches neither at small sizes (3.88 white, 3.26 dark). White is the
 * better of the two and is what comes back, so a sunset chip wants larger or
 * heavier text to clear AA.
 */
const DARK_INK = new Set(["golden", "harbour", "peachy", "blush"]);

/** A CSS colour for text drawn on `colour` at full strength. */
export function accentInk(colour) {
  return DARK_INK.has(colour) ? "var(--midnight)" : "var(--white)";
}

export { DARK_INK as ACCENTS_TAKING_DARK_INK };
