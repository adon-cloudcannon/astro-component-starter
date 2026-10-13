import { preview, band, bar, box, plate, pill, panel, line } from "../../../../../scripts/previews/kit.mjs";

const B = band(960);

// A pill row over three screenshot cards, each with a title, a line and a
// ruled foot. The pills are what tell it apart from the card collection.
const PILLS = [92, 80, 118];
const PILL_GAP = 18;
const RUN = PILLS.reduce((a, b) => a + b, 0) + PILL_GAP * (PILLS.length - 1);
const CARD_W = 300;
const CARD_GAP = 30;

export default preview({
  width: B.w,
  draw: [
    PILLS.map((w, i) => {
      let x = 640 - RUN / 2;
      for (let n = 0; n < i; n += 1) x += PILLS[n] + PILL_GAP;

      return pill(x, 0, w, 32, { variant: i === 0 ? "ink" : "ghost", r: 16 });
    }),
    [0, 1, 2].map((i) => {
      const x = 640 - (CARD_W * 3 + CARD_GAP * 2) / 2 + i * (CARD_W + CARD_GAP);

      return [
        plate(x, 78, CARD_W, 286),
        box(x, 78, CARD_W, 150, { r: 10, fill: panel, stroke: line }),
        bar(x + 24, 254, 150, "heading"),
        bar(x + 24, 288, CARD_W - 60, "body"),
        box(x + 24, 322, CARD_W - 48, 2, { r: 1, fill: line }),
        bar(x + 24, 336, 96, "micro"),
      ];
    }),
  ],
});
