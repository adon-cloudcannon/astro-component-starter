import { preview, band, bar, box, plate, lines, panel, line, ink } from "../../../../../scripts/previews/kit.mjs";

const B = band(760);

// A card hard right with a pill on its top edge, and the drawing's silhouette
// to its left crossing the card's rule. The pill and the overlap are the tell.
const CARD_X = B.left + 280;
const CARD_W = 480;

export default preview({
  width: B.w,
  draw: [
    box(B.left, 96, 320, 200, { r: 24, fill: panel, stroke: line }),
    plate(CARD_X, 60, CARD_W, 260, { r: 20 }),
    box(CARD_X + 160, 42, 160, 36, { r: 18, fill: ink }),
    bar(CARD_X + 40, 112, 300, "heading"),
    lines(CARD_X + 40, 166, [380, 340], { size: "body" }),
    bar(CARD_X + 40, 240, 180, "display"),
  ],
});
