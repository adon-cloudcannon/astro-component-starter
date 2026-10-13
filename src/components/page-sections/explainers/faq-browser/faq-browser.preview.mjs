import {
  preview,
  band,
  bar,
  box,
  plate,
  pill,
  panel,
  line,
} from "../../../../../scripts/previews/kit.mjs";

const B = band(960);

// A search row, then a row of topic pills with the first one filled, then the
// collapsed questions. The search and the pills are what tell it apart from
// the FAQ section's own preview, which is the same questions with no chrome.
const PILLS = [96, 84, 102];
const PILL_GAP = 18;
const PILL_RUN = PILLS.reduce((a, b) => a + b, 0) + PILL_GAP * (PILLS.length - 1);
const QUESTIONS = [288, 332];

export default preview({
  width: B.w,
  draw: [
    plate(B.left, 0, 960, 56),
    box(B.left + 24, 18, 20, 20, { r: 10, fill: panel, stroke: line }),
    bar(B.left + 60, 22, 150, "body"),
    PILLS.map((w, i) => {
      let x = 640 - PILL_RUN / 2;
      for (let n = 0; n < i; n += 1) x += PILLS[n] + PILL_GAP;

      return pill(x, 84, w, 34, { variant: i === 0 ? "ink" : "ghost", r: 17 });
    }),
    QUESTIONS.map((w, i) => {
      const y = 152 + i * 86;

      return [
        plate(B.left, y, 960, 70),
        bar(187, y + 22, w, "heading"),
        box(1074, y + 22, 26, 26, { r: 13, fill: panel, stroke: line }),
      ];
    }),
  ],
});
