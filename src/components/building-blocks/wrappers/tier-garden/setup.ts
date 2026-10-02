/**
 * Plants the garden from the cards it grows around, then grows it on scroll.
 *
 * Two jobs, kept apart. `plant` is geometry: it reads the cards' boxes and
 * draws a bed per card, and it reruns whenever those boxes change. `grow` is
 * the part that moves: how much of each bed is drawn, as a share of how far
 * the section has travelled through the window.
 *
 * Everything is drawn in the host's own pixels — the SVG takes a viewBox the
 * size of the host — so no number here is scaled or converted.
 */
type Garden = HTMLElement & {
  __gardenBound?: boolean;
  __gardenParts?: Part[];
};

/** One drawn thing, with the window of growth it belongs to. */
type Part = {
  el: SVGElement;
  /** Where in the whole garden's growth this starts and finishes, 0 to 1. */
  from: number;
  to: number;
  /** Strokes are drawn on; everything else pops open. */
  length?: number;
};

const NS = "http://www.w3.org/2000/svg";
const BLOOMS = ["var(--blush, #e7b0b9)", "var(--sunset, #d85a2c)", "var(--peachy, #f39b7b)"];
/** A leaf, drawn around (0,0) pointing along +x. */
const LEAF = "M0 0 C 8 -10, 24 -13, 35 -3 C 23 6, 8 9, 0 0 Z";

const clamp = (n: number, low: number, high: number) => Math.min(high, Math.max(low, n));

/** Deterministic jitter, so a rebuild draws the same garden. */
const wobble = (seed: number) => {
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  return n - Math.floor(n);
};

const make = (name: string, attrs: Record<string, string>) => {
  const el = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};

/** A sprig of leaves with a few buds, as the design's vines draw them. */
const sprig = (x: number, y: number, turn: number, scale: number) => {
  const g = make("g", {
    class: "tier-garden-pop",
    transform: `translate(${x} ${y}) rotate(${turn}) scale(${scale})`,
  });
  [-26, -6, 16].forEach((a) =>
    g.append(make("path", { class: "tier-garden-bud", d: "M0 0 L 11 0", transform: `rotate(${a})` }))
  );
  [
    { r: -34, s: 0.92, dark: true },
    { r: 2, s: 1, dark: false },
    { r: 36, s: 0.78, dark: false },
  ].forEach((leaf) =>
    g.append(
      make("path", {
        class: `tier-garden-blade${leaf.dark ? " is-dark" : ""}`,
        d: LEAF,
        transform: `rotate(${leaf.r}) scale(${leaf.s})`,
      })
    )
  );
  return g;
};

/** Tufts along the foot of a card. */
const grass = (box: { x: number; y: number; w: number; h: number }, seed: number) => {
  const parts: SVGElement[] = [];
  const base = box.y + box.h;
  const blades = Math.max(9, Math.round(box.w / 26));

  for (let i = 0; i < blades; i++) {
    const r = wobble(seed + i);
    const r2 = wobble(seed + i + 0.5);
    const x = box.x - 10 + ((box.w + 20) * (i + r * 0.6)) / blades;
    const tall = 26 + r2 * 34;
    const lean = (r - 0.5) * 30;
    parts.push(
      make("path", {
        class: `tier-garden-stroke is-grass${r > 0.78 ? " is-dark" : ""}`,
        d: `M${x} ${base} C ${x + lean * 0.3} ${base - tall * 0.5}, ${x + lean} ${
          base - tall * 0.8
        }, ${x + lean * 1.3} ${base - tall}`,
      })
    );
  }
  return parts;
};

/** A vine up the near side of a card, with sprigs along it. */
const vine = (box: { x: number; y: number; w: number; h: number }, seed: number) => {
  const stems: SVGElement[] = [];
  const pops: SVGElement[] = [];
  const foot = box.y + box.h;
  const x = box.x - 6;
  const top = box.y + box.h * 0.12;

  const stem = make("path", {
    class: "tier-garden-stroke is-vine",
    d: `M${x} ${foot + 8} C ${x - 18} ${foot - box.h * 0.3}, ${x + 22} ${
      box.y + box.h * 0.5
    }, ${x + 4} ${top} C ${x - 6} ${top - 22}, ${x + 26} ${top - 26}, ${x + 30} ${top - 6}`,
  });
  stems.push(stem);

  // Sprigs read off the stem itself, so they sit on it however it bends.
  document.body.append(stem);
  const length = stem.getTotalLength();
  const count = 5;
  for (let i = 0; i < count; i++) {
    const at = ((i + 0.8) / (count + 0.6)) * length;
    const p = stem.getPointAtLength(at);
    const side = i % 2 ? 1 : -1;
    pops.push(sprig(p.x, p.y, 200 + side * 62 + (wobble(seed + i) - 0.5) * 24, 0.5 + wobble(seed + i) * 0.22));
  }
  stem.remove();

  return { stems, pops };
};

/**
 * Blooms scattered over a card.
 *
 * No stalks. Stood on stems against one edge they read as three cut flowers
 * in a row; loose, they read as a card in flower. Spread a little past both
 * sides, so some sit in the gaps between tiers rather than all on the face,
 * and kept out of the top quarter, where the tier's name and points are.
 */
const flowers = (box: { x: number; y: number; w: number; h: number }, seed: number, count: number) => {
  const out: SVGElement[] = [];
  for (let i = 0; i < count; i++) {
    const r = wobble(seed + i * 1.7);
    const r2 = wobble(seed + i * 1.7 + 0.31);
    const r3 = wobble(seed + i * 1.7 + 0.77);
    // Two beds rather than one scatter: most of them low on the card, the
    // rest along either margin at any height. Spread evenly over the whole
    // face one landed on the word "benefits", and a flower a reader has to
    // look past is worse than no flower.
    const margin = r3 > 0.62;
    const x = margin
      ? box.x + (r > 0.5 ? box.w - 10 - r2 * 26 : -14 + r2 * 26)
      : box.x - 16 + (box.w + 32) * ((i + r) / count);
    const y = margin
      ? box.y + box.h * (0.3 + r * 0.6)
      : box.y + box.h * (0.66 + r2 * 0.3);
    out.push(bloom(x, y, BLOOMS[i % BLOOMS.length], 0.62 + r3 * 0.55));
  }
  return out;
};

/** A five-petal flower with a golden eye. */
const bloom = (x: number, y: number, colour: string, scale: number) => {
  const g = make("g", {
    class: "tier-garden-pop",
    transform: `translate(${x} ${y}) scale(${scale})`,
    style: `--tier-garden-bloom: ${colour}`,
  });
  for (let i = 0; i < 5; i++) {
    g.append(
      make("ellipse", {
        class: "tier-garden-petal",
        cx: "7",
        cy: "0",
        rx: "7",
        ry: "4.4",
        transform: `rotate(${(360 / 5) * i})`,
      })
    );
  }
  g.append(make("circle", { class: "tier-garden-eye", cx: "0", cy: "0", r: "3.2" }));
  return g;
};

/**
 * A cabbage tree out of the top of the card.
 *
 * A short trunk and a spray of long arching blades, which is what a Cordyline
 * does: the leaves fall from one crown rather than branching.
 */
const cabbageTree = (box: { x: number; y: number; w: number; h: number }, seed: number) => {
  const trunk: SVGElement[] = [];
  const crownBlades: SVGElement[] = [];
  const x = box.x + box.w * 0.72;
  const base = box.y + 18;
  const crown = base - 70;

  trunk.push(
    make("path", {
      class: "tier-garden-stroke is-trunk",
      d: `M${x} ${base} C ${x - 4} ${base - 26}, ${x + 3} ${crown + 20}, ${x} ${crown}`,
    })
  );

  const blades = 13;
  for (let i = 0; i < blades; i++) {
    const r = wobble(seed + i);
    // Fanned from straight up, both ways, arching over at the tips.
    const spread = -90 + (i - (blades - 1) / 2) * (166 / blades) + (r - 0.5) * 8;
    const len = 48 + r * 36;
    const rad = (spread * Math.PI) / 180;
    const tipX = x + Math.cos(rad) * len;
    const tipY = crown + Math.sin(rad) * len;
    const droop = 16 + r * 18;
    crownBlades.push(
      make("path", {
        class: `tier-garden-stroke is-frond${r > 0.72 ? " is-dark" : ""}`,
        d: `M${x} ${crown} Q ${x + Math.cos(rad) * len * 0.6} ${
          crown + Math.sin(rad) * len * 0.6 - 6
        }, ${tipX} ${tipY + droop}`,
      })
    );
  }

  // Kept apart so the crown opens once the trunk has arrived. Grown together,
  // the blades were already spreading beside a half-height trunk, which is
  // what made them look like they came from nowhere.
  return { trunk, crown: crownBlades };
};

const plant = (garden: Garden) => {
  const svg = garden.querySelector<SVGSVGElement>(".tier-garden-art");
  const host = garden.parentElement;
  if (!svg || !host) return;

  const cards = [...host.querySelectorAll<HTMLElement>(garden.dataset.cards || ".pricing-tier")];
  const hostBox = host.getBoundingClientRect();
  if (!cards.length || !hostBox.width) return;

  svg.setAttribute("viewBox", `0 0 ${hostBox.width} ${hostBox.height}`);
  svg.textContent = "";

  const boxes = cards
    .map((c) => c.getBoundingClientRect())
    .sort((a, b) => a.left - b.left)
    .map((b) => ({ x: b.left - hostBox.left, y: b.top - hostBox.top, w: b.width, h: b.height }));

  const parts: Part[] = [];
  const beds = boxes.length;

  boxes.forEach((box, index) => {
    // Each bed grows in its own slice of the scroll, overlapping the next a
    // little so the garden runs rather than ticks.
    const from = (index / beds) * 0.82;
    const to = clamp(from + 1 / beds + 0.12, 0, 1);
    const seed = index * 3.7 + 1;
    const bed = make("g", { class: "tier-garden-bed", "data-bed": String(index) });

    /**
     * Each tier keeps what the one below it has and adds its own.
     *
     * Bronze is grass, Silver adds the vine, Gold adds flowers, and the top
     * tier adds the tree — so the planting thickens up the staircase rather
     * than swapping one plant for another, which is what "more of everything"
     * means on the tallest card. The last card always takes the tree, however
     * many tiers there are.
     */
    const last = index === beds - 1;
    const stage = last ? 3 : Math.min(index, 2);

    const strokes: SVGElement[] = [];
    const pops: SVGElement[] = [];
    /** Drawn after the rest of this bed, not alongside it. */
    const late: SVGElement[] = [];

    strokes.push(...grass(box, seed));

    if (stage >= 1) {
      const grown = vine(box, seed);
      strokes.push(...grown.stems);
      pops.push(...grown.pops);
    }

    if (stage >= 2) pops.push(...flowers(box, seed + 3, stage >= 3 ? 7 : 5));

    if (stage >= 3) {
      const tree = cabbageTree(box, seed);
      strokes.push(...tree.trunk);
      late.push(...tree.crown);
    }

    strokes.forEach((el) => bed.append(el));
    late.forEach((el) => bed.append(el));
    pops.forEach((el) => bed.append(el));
    svg.append(bed);

    // Lengths have to be read once the nodes are in the document.
    const draw = (el: SVGElement, at: number, until: number) => {
      const length = (el as SVGPathElement).getTotalLength();
      el.setAttribute("stroke-dasharray", `${length}`);
      el.setAttribute("stroke-dashoffset", `${length}`);
      parts.push({ el, from: at, to: until, length });
    };

    strokes.forEach((el, i) => {
      const slot = strokes.length > 1 ? i / strokes.length : 0;
      draw(el, from + (to - from) * slot * 0.5, from + (to - from) * 0.78);
    });

    // The crown waits for the trunk, then opens blade by blade.
    late.forEach((el, i) => {
      const slot = late.length > 1 ? i / late.length : 0;
      const at = from + (to - from) * (0.62 + slot * 0.3);
      draw(el, at, Math.min(1, at + (to - from) * 0.22));
    });

    pops.forEach((el, i) => {
      const slot = pops.length > 1 ? i / pops.length : 0;
      const at = from + (to - from) * (0.4 + slot * 0.5);
      parts.push({ el, from: at, to: at });
    });
  });

  garden.__gardenParts = parts;
};

/**
 * How far the garden has grown.
 *
 * Measured off the host's own trip through the window rather than off the
 * page: it starts as the section's top reaches the bottom of the window and
 * is done well before the section leaves, so the finished garden is on screen
 * while the cards are still being read.
 */
const grow = (garden: Garden) => {
  const host = garden.parentElement;
  const parts = garden.__gardenParts;
  if (!host || !parts) return;

  const box = host.getBoundingClientRect();
  const view = window.innerHeight || 1;
  const progress = clamp((view - box.top) / (view * 0.78), 0, 1);

  for (const part of parts) {
    if (part.length) {
      const span = Math.max(0.001, part.to - part.from);
      const local = clamp((progress - part.from) / span, 0, 1);
      part.el.setAttribute("stroke-dashoffset", `${part.length * (1 - local)}`);
    } else if (progress >= part.from && !part.el.hasAttribute("data-open")) {
      part.el.setAttribute("data-open", "");
    }
  }
};

export const setupTierGarden = (garden: Garden) => {
  if (garden.__gardenBound) return;
  garden.__gardenBound = true;

  const refresh = () => {
    plant(garden);
    grow(garden);
  };

  refresh();

  // Fonts land after first paint and change the cards' heights, which every
  // number in here is measured from.
  if (document.fonts?.ready) document.fonts.ready.then(refresh);

  let frame = 0;
  window.addEventListener(
    "scroll",
    () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        grow(garden);
      });
    },
    { passive: true }
  );

  if ("ResizeObserver" in window && garden.parentElement) {
    let first = true;
    new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      refresh();
    }).observe(garden.parentElement);
  }
};

export const setupAllTierGardens = () => {
  document.querySelectorAll<Garden>(".tier-garden").forEach(setupTierGarden);
};
