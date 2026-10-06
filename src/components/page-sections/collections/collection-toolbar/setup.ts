/**
 * The search box hides the cards it does not match.
 *
 * Here rather than in an inline `<script>` because CloudCannon renders a
 * region with `renderToStaticMarkup` and never runs inline scripts, so the
 * field would do nothing in the Visual Editor. `editor-live-sync.js` calls
 * this too.
 *
 * The toolbar and the grid it filters are two sections, so they are tied by
 * name: the toolbar carries `data-collection-toolbar="templates"` and the
 * grid `data-collection="templates"`. An empty name filters the first grid
 * on the page, which is the single-collection case.
 *
 * Hidden rather than removed. CloudCannon maps a region's array items by
 * walking its children in DOM order, so taking one out would write the next
 * card's fields onto the one after it — the same trap the team wall hit.
 */
type Toolbar = HTMLElement & { __collectionFilter?: () => void };

const matches = (card: HTMLElement, term: string): boolean =>
  !term || (card.textContent ?? "").toLowerCase().includes(term);

export function setupCollectionToolbar(toolbar: Toolbar): void {
  if (toolbar.dataset.filtering !== undefined) return;

  const field = toolbar.querySelector<HTMLInputElement>("[data-collection-search]");
  if (!field) return;

  const name = toolbar.dataset.collectionToolbar ?? "";
  const grid = name
    ? document.querySelector<HTMLElement>(`[data-collection="${name}"]`)
    : document.querySelector<HTMLElement>("[data-collection]");
  if (!grid) return;

  toolbar.dataset.filtering = "";

  /* Every grid on this site draws one wrapper between itself and its cards,
     and they do not agree on its name: `Grid` calls it `.grid-inner` and the
     card grid `.card-grid-inner`. Named, the filter found a single "card"
     that always matched and nothing ever hid. So the hop is made on shape
     rather than on a class — one child that itself holds several — which
     also leaves a grid with no wrapper working. */
  const only = grid.children.length === 1 ? (grid.firstElementChild as HTMLElement | null) : null;
  const list = only && only.children.length > 1 ? only : grid;
  const cards = [...list.children] as HTMLElement[];
  /* Announced rather than silent: a grid that quietly loses two thirds of
     itself is a change a screen reader has no way of noticing. */
  const status = document.createElement("p");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  grid.insertAdjacentElement("beforebegin", status);

  const apply = () => {
    const term = field.value.trim().toLowerCase();
    let shown = 0;
    for (const card of cards) {
      const hit = matches(card, term);
      card.hidden = !hit;
      if (hit) shown += 1;
    }
    status.textContent = term ? `${shown} of ${cards.length} shown` : "";
  };

  toolbar.__collectionFilter = apply;
  field.addEventListener("input", apply);
  apply();
}

export function setupAllCollectionToolbars(root: ParentNode = document): void {
  root
    .querySelectorAll<Toolbar>("[data-collection-toolbar], .collection-toolbar-row")
    .forEach((toolbar) => setupCollectionToolbar(toolbar));
}
