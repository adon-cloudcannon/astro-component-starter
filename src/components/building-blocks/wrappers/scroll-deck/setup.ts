/**
 * Rail scroll-spy and depth cue for the Scroll Deck. Used by
 * `ScrollDeck.astro`'s inline script and by `editor-live-sync.js`, where
 * inline scripts don't run. The rail is a list of real anchors, so it
 * navigates without this; the deck still stacks, just without the dimming.
 *
 * The depth cue is JS rather than a `view()` scroll-driven animation because a
 * view progress timeline measures the subject's STUCK position: a pinned card
 * never enters its own exit range, so the timeline sits at negative progress
 * forever.
 */

/** Cards dim and shrink one step per card covering them, up to this many. */
const MAX_DEPTH = 3;

export function setupScrollDeck(deck: HTMLElement): void {
  // Keyed on the layout, not the `.scroll-deck` root: the root survives an
  // editor re-render while its contents are replaced, so a flag on the root
  // would skip the new cards and leave the observers on discarded nodes.
  const layout = deck.querySelector<HTMLElement>(".scroll-deck-layout");

  if (!layout || layout.hasAttribute("data-scroll-deck-initialized")) return;
  layout.setAttribute("data-scroll-deck-initialized", "");

  const cards = Array.from(deck.querySelectorAll<HTMLElement>(".scroll-deck-card"));
  const links = Array.from(deck.querySelectorAll<HTMLAnchorElement>(".scroll-deck-rail-link"));
  const rail = deck.querySelector<HTMLElement>(".scroll-deck-rail");
  const marker = deck.querySelector<HTMLElement>(".scroll-deck-rail-marker");

  if (!cards.length) {
    // In the CloudCannon editor the subtree can be briefly incomplete while
    // content loads; the live-sync observer re-runs setup once it lands.
    if (import.meta.env.DEV) {
      console.debug("ScrollDeck: skipping setup, required elements missing", deck);
    }
    return;
  }

  // A block flow gives every card one shared sticky containing block. That is
  // what lets the complete stepped stack release together at the end. Measure
  // the tallest natural card so this flow keeps the equal-height card chrome
  // that the grid layout previously provided.
  // Declared up here because `syncCardHeight` places the marker, and that runs
  // during setup: left where it was read, `active` was still in its temporal
  // dead zone and the whole setup threw.
  let active = -1;

  const syncCardHeight = () => {
    deck.style.removeProperty("--deck-card-height");

    const tallest = Math.ceil(
      Math.max(...cards.map((card) => card.getBoundingClientRect().height))
    );

    deck.style.setProperty("--deck-card-height", `${tallest}px`);

    if (rail) {
      deck.style.setProperty(
        "--deck-rail-height",
        `${Math.ceil(rail.getBoundingClientRect().height)}px`
      );
    }

    placeMarker();
  };

  // Measured off the link rather than worked out from the pitch token, so the
  // marker keeps up with a rail whose spacing is overridden or whose hit area
  // changes with the breakpoint. Both the link and the marker have the rail as
  // their offset parent, since it is sticky.
  const placeMarker = () => {
    const link = links[active];

    if (!marker || !link) return;

    marker.style.translate = `-50% ${link.offsetTop}px`;
  };

  deck.style.setProperty("--deck-last-index", String(cards.length - 1));
  syncCardHeight();

  const resizeObserver = new ResizeObserver(syncCardHeight);
  const contentObserver = new MutationObserver(syncCardHeight);

  cards.forEach((card) => {
    resizeObserver.observe(card);
    contentObserver.observe(card, { childList: true, subtree: true, characterData: true });
  });

  // A card's sticky `top` is resolved against its scrollport, which is the
  // viewport on a real page but the preview pane in the component docs.
  // Comparing viewport coordinates would be wrong there.
  //
  // Resolved on every read, never cached: the answer changes with layout, and a
  // stale one silently stops the rail. `body` must be excluded and the element
  // must ACTUALLY scroll — the site sets `overflow-x: hidden` on body, which
  // computes `overflow-y: auto`, so testing the computed value alone picks body
  // on every real page.
  const scrollport = (): HTMLElement | null => {
    let el = deck.parentElement;

    while (el && el !== document.body && el !== document.documentElement) {
      const overflowY = getComputedStyle(el).overflowY;

      if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  };

  const scrollportTop = (): number => scrollport()?.getBoundingClientRect().top ?? 0;

  const apply = (index: number) => {
    if (index === active) return;
    active = index;

    links.forEach((link, i) => {
      if (i === index) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });

    placeMarker();

    cards.forEach((card, i) => {
      const depth = Math.min(Math.max(index - i, 0), MAX_DEPTH);

      card
        .querySelector<HTMLElement>(".scroll-deck-card-inner")
        ?.style.setProperty("--deck-covered", String(depth));
    });
  };

  // The card on top is the highest-indexed one that has reached its own sticky
  // top. Reading the computed `top` keeps this in step with the CSS rather
  // than re-deriving the peek offsets here.
  const update = () => {
    const portTop = scrollportTop();
    let top = 0;

    cards.forEach((card, index) => {
      const stickyTop = parseFloat(getComputedStyle(card).top);

      if (!Number.isNaN(stickyTop) && card.getBoundingClientRect().top - portTop <= stickyTop + 1) {
        top = index;
      }
    });

    const lastCard = cards[cards.length - 1];
    const lastStickyTop = parseFloat(getComputedStyle(lastCard).top);
    const releaseDistance = lastCard.getBoundingClientRect().top - portTop - lastStickyTop;

    rail?.style.setProperty("--deck-rail-release", `${Math.min(0, releaseDistance)}px`);
    apply(top);
  };

  // Rooted at the viewport in every environment. A nested scrollport moves its
  // contents through the viewport too, so this still fires there, whereas an
  // observer rooted at an element that later stops scrolling goes quiet. A
  // callback only arrives on a threshold crossing, so the ladder has to be fine
  // enough to keep up with a card sliding over a pinned one.
  const observer = new IntersectionObserver(update, {
    threshold: Array.from({ length: 21 }, (_, i) => i / 20),
  });

  cards.forEach((card) => observer.observe(card));

  // Intersection thresholds are enough for the handoff between cards, but a
  // final card can remain fully intersecting while it travels through its
  // trailing runway. Capture sees both document and nested preview scrollports.
  const onScroll = () => {
    // The root outlives an editor re-render, so the layout is what says whether
    // these observers still point at live nodes.
    if (!layout.isConnected) {
      observer.disconnect();
      resizeObserver.disconnect();
      contentObserver.disconnect();
      document.removeEventListener("scroll", onScroll, true);
      return;
    }

    update();
  };

  // The rail cannot navigate as a plain anchor jump. Every card is sticky in
  // one shared containing block, so once the stack is pinned they all sit at
  // the top of the scrollport at once: the target of an earlier card is already
  // in view and the browser has nothing to scroll to. Measured on the homepage
  // deck, clicking dot 1 from card 3 moved the page 144px the WRONG way, while
  // clicking downwards worked, which is what reads as "it only goes forwards".
  //
  // The offset that makes a card active is where its NATURAL top reaches its
  // sticky top, and `offsetTop` reports the stuck position rather than that
  // one. Unsticking the cards for a single synchronous read is the cheapest way
  // to recover it, and it only happens on a click.
  const scrollOffsets = (): number[] => {
    cards.forEach((card) => card.style.setProperty("position", "static"));
    const natural = cards.map((card) => card.offsetTop);
    cards.forEach((card) => card.style.removeProperty("position"));

    const port = scrollport();
    const deckTop = deck.getBoundingClientRect().top;
    const deckOffset = port
      ? deckTop - port.getBoundingClientRect().top + port.scrollTop
      : deckTop + window.scrollY;

    return cards.map((card, index) => {
      const stickyTop = parseFloat(getComputedStyle(card).top);

      // A pixel past the threshold, so the card is decidedly the active one
      // rather than sitting exactly on the line `update()` tests.
      return deckOffset + natural[index] - (Number.isNaN(stickyTop) ? 0 : stickyTop) + 1;
    });
  };

  const goTo = (index: number, behavior: ScrollBehavior) => {
    const target = scrollOffsets()[index];

    if (target === undefined) return;
    (scrollport() ?? window).scrollTo({ top: target, behavior });
  };

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

      event.preventDefault();
      goTo(
        index,
        matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      );

      // Keeps the link shareable without letting the hash change scroll the
      // page back to the stuck position we just scrolled away from.
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  // Landing on the page with a card's hash has the same problem, one frame
  // later: the browser has already jumped to the stuck position by the time
  // this runs, so the deck opens on the wrong card.
  const landed = links.findIndex((link) => link.getAttribute("href") === location.hash);

  if (landed >= 0) requestAnimationFrame(() => goTo(landed, "auto"));

  document.addEventListener("scroll", onScroll, { capture: true, passive: true });
  update();
}

export function setupAllScrollDecks(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".scroll-deck").forEach(setupScrollDeck);
}
