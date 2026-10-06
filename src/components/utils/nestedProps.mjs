/**
 * The two tabs a page section's props are grouped into, and how to address
 * them.
 *
 * CloudCannon draws a structure value's first-level nested keys as tabs when
 * the value sets `tabbed: true`. `groups` cannot do it — it renders as
 * accordions whatever it is handed — so the split is a shape in the data:
 * `style` holds what paints the band, `content` holds everything else.
 *
 * Two things follow, and this carries both so a section does not have to.
 *
 * The props arrive nested and the component's body wants them flat, so
 * `props` merges them back into the names it already uses. A flat block still
 * works: a page written before the split, or a component that has not taken
 * it yet, comes through unchanged.
 *
 * And `data-prop` is a path into the file's frontmatter, not a prop name, so
 * a nested value needs its group on the front or the editable region binds to
 * nothing. `at()` writes that path. It takes the group from the key rather
 * than from the data, so a prop the page has not set yet still resolves —
 * which is most of them, since a section only writes what it uses.
 *
 * `at()` is for a section's OWN props only. A binding inside an array item —
 * a card's title, a quote's author — resolves against the item, not the
 * block, and prefixing one points it at a key that does not exist.
 */

/** What goes in `style`. Everything else is content. */
export const STYLE_KEYS = new Set([
  "background",
  "backgroundColor",
  "colorScheme",
  "haze",
  "lockColorScheme",
  "pattern",
  "panelBackgroundColor",
]);

export function nestedProps(astroProps, extraStyleKeys = []) {
  const { content, style, ...rest } = astroProps;
  const grouped = content !== undefined || style !== undefined;
  const props = grouped ? { ...rest, ...(content ?? {}), ...(style ?? {}) } : astroProps;
  const styleKeys = extraStyleKeys.length
    ? new Set([...STYLE_KEYS, ...extraStyleKeys])
    : STYLE_KEYS;

  const at = (key) => {
    if (!grouped) return key;
    return `${styleKeys.has(key) ? "style" : "content"}.${key}`;
  };

  return { props, at };
}
