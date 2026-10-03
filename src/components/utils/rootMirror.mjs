/**
 * Mirror a component's prop-driven root attributes onto a direct child.
 *
 * CloudCannon keeps a region's root element and swaps only its contents, so an
 * attribute on the root whose value comes from a prop never changes in the
 * Visual Editor: the value saves and the page does not move until a reload.
 * `npm run lint:roots` names every one.
 *
 * Move the attribute down where it can go — a custom property belongs on
 * whatever reads it — and lift a name back with `:has()` where the root needs
 * it and the values are few. This is for what is left: a theme, a layout
 * class, a size the CSS keys off, where the attribute has to resolve on the
 * root and its values cannot be enumerated into one rule each.
 *
 * The component keeps rendering the truth on its root, so the built page is
 * unchanged. It also hands the same attributes to a direct child, which is
 * content, so the editor rewrites it; `editor-live-sync.js` copies them back
 * up. `null` removes an attribute, which is how a conditional one comes off.
 *
 *   const mirror = rootMirror({ "data-tone": tone, "data-theme": theme });
 *   <div data-tone={tone} data-theme={theme}>
 *     <blockquote {...mirror}>…</blockquote>
 *
 * `class` and `style` are maps, never whole values: a root's class list holds
 * the builder's own hooks and its band colour, and its style can hold more
 * than one custom property, so replacing either would throw away what the
 * component does not know about.
 *
 *   rootMirror({
 *     class: { scratched: Boolean(scratch) },
 *     style: { "--scratch-fill": scratch ? colour(scratch) : null },
 *   })
 *
 * @param {Record<string, unknown>} attributes
 * @returns {{ "data-root-mirror": string }}
 */
export function rootMirror(attributes) {
  const normalised = Object.fromEntries(
    Object.entries(attributes).map(([name, value]) => {
      if ((name === "class" || name === "style") && value && typeof value === "object") {
        return [name, value];
      }

      return [name, value === undefined || value === false ? null : value];
    })
  );

  return { "data-root-mirror": JSON.stringify(normalised) };
}
