/**
 * Plants the garden from the cards it grows around, then grows it on arrival.
 *
 * Two jobs, kept apart. `plant` is geometry: it reads the cards' boxes and
 * draws a bed per card, and it reruns whenever those boxes change. `show` is
 * the part that moves: how much of each bed is drawn at a given point in the
 * growth, which `run` walks from 0 to 1 once the band is in view.
 *
 * Everything is drawn in the host's own pixels — the SVG takes a viewBox the
 * size of the host — so no number here is scaled or converted.
 */
type Garden = HTMLElement & {
  __gardenBound?: boolean;
  __gardenParts?: Part[];
  __gardenRunning?: boolean;
};

/** One drawn thing, with the window of growth it belongs to. */
type Part = {
  el: SVGElement;
  /** Where in the whole garden's growth this starts and finishes, 0 to 1. */
  from: number;
  to: number;
  /** Strokes are drawn on; everything else pops open. */
  length?: number;
  /** A filled blade, which comes up out of the ground. */
  sprout?: boolean;
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

/**
 * Tufts along the foot of a card.
 *
 * Filled blades rather than strokes: a blade of grass is wide at the ground
 * and comes to a point, and a stroke is the same width all the way up, which
 * is why the first pass read as wire. Each one is a triangle with a bend in
 * it — up one side, around the tip, back down the other.
 *
 * Dense, too. Thin and spaced out it read as a few weeds; the illusion needs
 * enough blades to overlap.
 */
const grass = (box: { x: number; y: number; w: number; h: number }, seed: number) => {
  const parts: SVGElement[] = [];
  const base = box.y + box.h;
  const blades = Math.max(22, Math.round(box.w / 11));

  for (let i = 0; i < blades; i++) {
    const r = wobble(seed + i);
    const r2 = wobble(seed + i + 0.5);
    const x = box.x - 12 + ((box.w + 24) * (i + r * 0.8)) / blades;
    // Short enough to clear the cards' last line. The tallest blades were
    // touching "Free onboarding and training" at the foot of the first card.
    const tall = 20 + r2 * 30;
    const lean = (r - 0.5) * 34;
    const wide = 2.6 + r2 * 2.2;
    const tipX = x + lean * 1.3;
    const tipY = base - tall;
    // Out from the base, bowing the way it leans, to a point, and back.
    parts.push(
      make("path", {
        class: `tier-garden-blade-grass${r > 0.74 ? " is-dark" : ""}`,
        d: `M${x - wide} ${base} Q ${x + lean * 0.35 - wide * 0.5} ${base - tall * 0.58}, ${tipX} ${tipY} Q ${
          x + lean * 0.35 + wide * 0.7
        } ${base - tall * 0.55}, ${x + wide} ${base} Z`,
      })
    );
  }
  return parts;
};

/** A vine up the near side of a card, with sprigs along it. */
const vine = (
  box: { x: number; y: number; w: number; h: number },
  seed: number,
  /** Blooms on the stem itself, which only the top tier gets. */
  flowering = false
) => {
  const stems: SVGElement[] = [];
  const pops: { el: SVGElement; rise: number }[] = [];
  const foot = box.y + box.h;
  // On the card, but at its very edge: the cards are padded about 26 and the
  // tier's name starts there, so a stem any further in strikes through
  // "Silver", "Gold" and "Platinum" on the way past.
  const x = box.x + 9;
  // Dead on the top edge, so it reads as carrying on behind the card rather
  // than stopping in the middle of it.
  const top = box.y;

  // No hook at the top. Three cards carrying the same little curl read as a
  // repeated stamp rather than as three plants; a plain stem is quieter, and
  // the sprigs are what make it a vine.
  const stem = make("path", {
    class: "tier-garden-stroke is-vine",
    // Out of the grass, not from under it. Started below the card's foot the
    // stem's tail hung past the bottom of the lawn, which read as a vine
    // growing out of the floor rather than out of the planting.
    d: `M${x} ${foot - 10} C ${x - 22} ${foot - box.h * 0.36}, ${x + 26} ${
      box.y + box.h * 0.46
    }, ${x + 4} ${top}`,
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
    pops.push({
      el: sprig(p.x, p.y, 200 + side * 62 + (wobble(seed + i) - 0.5) * 24, 0.5 + wobble(seed + i) * 0.22),
      // Where it sits along the stem, which is when the stem reaches it.
      rise: at / length,
    });
  }
  if (flowering) {
    // On the stem, at the points it has already reached, so they come out
    // of the vine rather than hovering beside it.
    [0.34, 0.58, 0.79].forEach((along, i) => {
      const p = stem.getPointAtLength(along * length);
      pops.push({
        el: bloom(p.x, p.y, BLOOMS[i % BLOOMS.length], 0.78 + wobble(seed + i * 2) * 0.3),
        rise: along,
      });
    });
  }

  stem.remove();

  return { stems, pops };
};

/**
 * A butterfly, which flies in once the planting has settled.
 *
 * The only thing here that arrives rather than grows, so it is the only one
 * that moves on its own clock: the growth sets it going and CSS flies it.
 * It travels on an `offset-path`, which banks it along the curve, so nothing
 * has to work out which way it is pointing.
 */
const butterfly = (box: { x: number; y: number; w: number; h: number }, stage: number) => {
  // High on the card's far corner, with the wings allowed over the edge.
  const endX = box.x + box.w - 28;
  const endY = box.y + 18;
  /**
   * In from off the right of the band on a shallow glide.
   *
   * Every point moves the same way — right to left, high to low — which is
   * what finally stopped the whiplash. The curve before this had its first
   * handle well to the LEFT of where it lands and its second back to the
   * RIGHT, so the butterfly overshot the card, swung back, and settled: a
   * boomerang, in a line that was meant to read as a drift.
   */
  const flight =
    `M${stage + 230} ${endY - 86} C ${stage + 80} ${endY - 70}, ` +
    `${endX + 60} ${endY - 34}, ${endX} ${endY}`;

  const g = make("g", { class: "tier-garden-pop tier-garden-flier" });
  const inner = make("g", { class: "tier-garden-flight", style: `offset-path: path("${flight}")` });
  // Set down at an angle rather than square to the card, head to the right.
  // The rotate is on the group's own transform, which turns about its local
  // origin — the body — so no transform-box is involved. It is drawn head-up,
  // so a positive angle turns it clockwise, which is to the right.
  const tilt = make("g", { transform: "rotate(26)" });

  // Two pairs of wings around a body at (0,0), drawn small: it is a long way
  // off and it should read as a flicker, not a specimen.
  tilt.append(
    make("path", { class: "tier-garden-wing is-left", d: "M0 0 C -13 -14, -26 -9, -21 2 C -17 10, -6 7, 0 0 Z" }),
    make("path", { class: "tier-garden-wing is-left is-low", d: "M0 1 C -10 6, -17 14, -10 17 C -4 19, -1 9, 0 1 Z" }),
    make("path", { class: "tier-garden-wing is-right", d: "M0 0 C 13 -14, 26 -9, 21 2 C 17 10, 6 7, 0 0 Z" }),
    make("path", { class: "tier-garden-wing is-right is-low", d: "M0 1 C 10 6, 17 14, 10 17 C 4 19, 1 9, 0 1 Z" }),
    make("ellipse", { class: "tier-garden-body", cx: "0", cy: "3", rx: "1.7", ry: "7" })
  );
  inner.append(tilt);
  g.append(inner);
  return g;
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
  const out: { el: SVGElement; rise: number }[] = [];
  for (let i = 0; i < count; i++) {
    const r = wobble(seed + i * 1.7);
    const r2 = wobble(seed + i * 1.7 + 0.31);
    const r3 = wobble(seed + i * 1.7 + 0.77);
    // Low on the card only. They used to climb either margin at any height
    // too, which put a big bloom up beside the tier's name — the loudest
    // thing in the band, arriving before the vine had got anywhere.
    const x = box.x - 16 + (box.w + 32) * ((i + r) / count);
    // The bottom seventh of the card, which is below every tier's last
    // feature line. Gold's list runs to about 0.80 of its height, so blooms
    // at 0.66 sat on "Marketing opportunities" and at 0.78 on "Beta
    // testing".
    const y = box.y + box.h * (0.87 + r2 * 0.11);
    out.push({
      el: bloom(x, y, BLOOMS[i % BLOOMS.length], 0.62 + r3 * 0.55),
      // 0 at the card's foot, 1 at its head, so a bloom opens as the vine
      // beside it reaches that height rather than all of them at once.
      rise: clamp((box.y + box.h - y) / box.h, 0, 1),
    });
  }
  return out;
};

/** A five-petal flower with a golden eye. */
const bloom = (x: number, y: number, colour: string, scale: number) => {
  const g = make("g", {
    class: "tier-garden-pop tier-garden-bloom",
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
    // Where this bed sits across the row, which is what staggers each phase
    // from left to right.
    const across = beds > 1 ? index / (beds - 1) : 0;
    const seed = index * 3.7 + 1;
    const bed = make("g", { class: "tier-garden-bed", "data-bed": String(index) });

    /**
     * Each tier keeps what the one below it has and adds its own.
     *
     * Grass; then a vine; then flowers in the grass; then flowers in the
     * grass and up the vine as well. Four tiers, four steps, each one
     * everything the tier below it has plus one thing more.
     */
    const last = index === beds - 1;
    const stage = last ? 3 : Math.min(index, 2);

    const strokes: SVGElement[] = [];
    /** Filled shapes: they grow from the ground rather than drawing on. */
    const sprouts: SVGElement[] = [];
    /** Leaves and petals, each with how far up its plant it sits. */
    const pops: { el: SVGElement; rise: number }[] = [];

    sprouts.push(...grass(box, seed));

    if (stage >= 1) {
      const grown = vine(box, seed, stage >= 3);
      strokes.push(...grown.stems);
      pops.push(...grown.pops);
    }

    if (stage >= 2) pops.push(...flowers(box, seed + 3, stage >= 3 ? 9 : 5));

    // The butterfly lands on the top tier, after everything else is up.
    if (stage >= 3) pops.push({ el: butterfly(box, hostBox.width), rise: 1.6 });

    sprouts.forEach((el) => bed.append(el));
    strokes.forEach((el) => bed.append(el));
    pops.forEach(({ el }) => bed.append(el));
    svg.append(bed);

    /**
     * One wave, not three phases.
     *
     * The lawn crosses the row, and each tier's vine starts as the lawn
     * reaches that tier rather than waiting for the whole lawn to finish.
     * The sprigs and the blooms then open at the height the vine has got to,
     * so a flower never appears above the stem that is meant to be carrying
     * it. Everything after the grass is keyed off one pair of numbers per
     * bed, which is what keeps them in step.
     */
    const wave = across * 0.46;
    const climbFrom = wave + 0.08;
    const climbSpan = 0.34;

    const draw = (el: SVGElement, at: number, until: number) => {
      const length = (el as SVGPathElement).getTotalLength();
      el.setAttribute("stroke-dasharray", `${length}`);
      el.setAttribute("stroke-dashoffset", `${length}`);
      parts.push({ el, from: at, to: until, length });
    };

    sprouts.forEach((el, i) => {
      const slot = sprouts.length > 1 ? i / sprouts.length : 0;
      const at = wave + slot * 0.12;
      parts.push({ el, from: at, to: at, sprout: true });
    });

    strokes.forEach((el) => draw(el, climbFrom, climbFrom + climbSpan));

    pops.forEach(({ el, rise }) => {
      // A touch behind the tip, so the stem is always ahead of its own leaves.
      // A rise past 1 means "after this bed is done", which is the butterfly.
      const at =
        rise > 1
          ? Math.min(0.97, climbFrom + climbSpan * 1.05)
          : climbFrom + climbSpan * clamp(rise * 1.04 - 0.04, 0, 1);
      parts.push({ el, from: at, to: at });
    });
  });

  garden.__gardenParts = parts;
};

/** How long the whole garden takes to come up once it starts: lawn, then
 * vines and their flowers behind it. */
const SPAN = 1500;

/** Apply a point in the growth, 0 to 1, to every part. */
const show = (garden: Garden, progress: number) => {
  const parts = garden.__gardenParts;
  if (!parts) return;

  for (const part of parts) {
    if (part.length) {
      const span = Math.max(0.001, part.to - part.from);
      const local = clamp((progress - part.from) / span, 0, 1);
      part.el.setAttribute("stroke-dashoffset", `${part.length * (1 - local)}`);
    } else if (progress >= part.from && !part.el.hasAttribute("data-open")) {
      part.el.setAttribute("data-open", "");
      if (part.sprout) part.el.setAttribute("data-sprout", "");
    }
  }
};

/**
 * Grow it on a clock, started when the band arrives.
 *
 * It used to track the scrollbar, which sounds right and is not: the band is
 * taller than it looks, so by the time it is centred enough to read, its own
 * trip through the window is nearly over and the first two beds have already
 * finished. Nobody saw them grow. Started on arrival, the whole thing plays
 * once, in order, at a speed that has nothing to do with how fast the reader
 * happens to be scrolling.
 */
const run = (garden: Garden) => {
  if (garden.__gardenRunning) return;
  garden.__gardenRunning = true;

  const started = performance.now();
  const tick = () => {
    const progress = clamp((performance.now() - started) / SPAN, 0, 1);
    show(garden, progress);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

export const setupTierGarden = (garden: Garden) => {
  if (garden.__gardenBound) return;
  garden.__gardenBound = true;

  const refresh = () => {
    plant(garden);
    // A rebuild after the garden has been up keeps it up: the parts are new
    // elements, so they start closed again unless they are shown.
    if (garden.__gardenRunning) show(garden, 1);
  };

  refresh();

  // Fonts land after first paint and change the cards' heights, which every
  // number in here is measured from.
  if (document.fonts?.ready) document.fonts.ready.then(refresh);

  const host = garden.parentElement;
  if (!host) return;

  if ("IntersectionObserver" in window) {
    const watcher = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        watcher.disconnect();
        run(garden);
      },
      // A fifth of the band in view, which on this one is the heading and the
      // top of the shortest card.
      { threshold: 0.2 }
    );
    watcher.observe(host);
  } else {
    run(garden);
  }

  if ("ResizeObserver" in window) {
    let first = true;
    new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      refresh();
    }).observe(host);
  }
};

export const setupAllTierGardens = () => {
  document.querySelectorAll<Garden>(".tier-garden").forEach(setupTierGarden);
};
