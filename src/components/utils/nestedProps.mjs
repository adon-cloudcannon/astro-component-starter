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

/**
 * What goes in `style`. Everything else is content.
 *
 * Two kinds: what paints the band, and how much room it takes. The width and
 * the paddings are settings rather than copy wherever they appear, so they
 * are here rather than cherry-picked per section — some sections may end up
 * hiding them, which is a different question from where they belong.
 */
export const STYLE_KEYS = new Set([
  "background",
  "backgroundColor",
  "colorScheme",
  "haze",
  "lockColorScheme",
  "pattern",
  "panelBackgroundColor",
  "maxContentWidth",
  "paddingHorizontal",
  "paddingVertical",
  "paddingVerticalStart",
  "paddingVerticalEnd",
]);

export function nestedProps(astroProps, options = {}) {
  const { extraStyleKeys = [], nest = {} } = Array.isArray(options)
    ? { extraStyleKeys: options }
    : options;

  const { content, style, ...rest } = astroProps;
  const grouped = content !== undefined || style !== undefined;
  const styleKeys = extraStyleKeys.length
    ? new Set([...STYLE_KEYS, ...extraStyleKeys])
    : STYLE_KEYS;

  /* A group may hold objects of its own — the heading's level and size sit
     with the heading itself — so flatten one level further wherever `nest`
     names a key. Only the names it lists: a prop whose value is genuinely an
     object, like `background`, has to arrive whole. */
  const flatten = (group) => {
    const out = {};
    for (const [key, value] of Object.entries(group ?? {})) {
      if (key in nest && value && typeof value === "object" && !Array.isArray(value)) {
        Object.assign(out, value);
      } else {
        out[key] = value;
      }
    }
    return out;
  };

  const props = grouped
    ? { ...rest, ...flatten(content), ...flatten(style) }
    : astroProps;

  /* Which sub-object a prop belongs to, from the declaration rather than from
     the data, so a prop the page has not set still resolves. */
  const subGroup = new Map();
  for (const [name, keys] of Object.entries(nest)) for (const key of keys) subGroup.set(key, name);

  const at = (key) => {
    if (!grouped) return key;
    const group = styleKeys.has(key) ? "style" : "content";
    const sub = subGroup.get(key);
    return sub ? `${group}.${sub}.${key}` : `${group}.${key}`;
  };

  return { props, at };
}
