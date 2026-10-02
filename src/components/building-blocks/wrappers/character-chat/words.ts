/**
 * The shapes a message is written in.
 *
 * The design's own speech bubble has no words in it: it is a handful of
 * coloured blocks — a green arch, an orange hourglass, a couple of bars —
 * standing in for a sentence. So a message here is built the same way, as
 * words of shapes rather than letters, and the shapes come out of the same
 * palette the illustrations are drawn in.
 *
 * Generated rather than authored, from a seed, so an editor writes "six words"
 * and gets a sentence that looks like one. Deterministic on purpose: the
 * markup is rendered once on the server and never redrawn, so the same seed
 * has to give the same sentence every time or the page would change shape
 * under a reader.
 */
export type Glyph = { kind: string; width: number; color: string };
export type Word = Glyph[];

/** xorshift32. Small, seedable, and the same in Node and the browser. */
const random = (seed: number) => {
  let state = seed >>> 0 || 0x9e3779b9;
  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0x100000000;
  };
};

/* Blues, reds and greens, which is what the drawing uses. Golden and blush are
   in the file too but they are the illustrations' highlight colours, so they
   turn up about a fifth as often — a sentence of them reads as a different
   palette rather than as the same one. */
const INK = [
  "pacific", "pacific", "pacific",
  "sunset", "sunset", "sunset",
  "moss", "moss", "moss",
  "golden",
  "blush",
];

/* A bar is the body of most words; the rest are the shapes that make a line of
   them look written rather than ruled. */
const KINDS = ["bar", "bar", "bar", "bar", "block", "dot", "arch", "hourglass", "wedge"];

const pick = <T,>(next: () => number, list: T[]) => list[Math.floor(next() * list.length)];

/**
 * One message, as words of shapes.
 *
 * `length` is roughly how many words; the count wobbles either side of it so a
 * thread of messages is not a stack of identical lines.
 */
export const compose = (seed: number, length: number): Word[] => {
  const next = random(seed);
  const count = Math.max(1, Math.round(length + (next() - 0.5) * 2));
  const words: Word[] = [];

  for (let w = 0; w < count; w++) {
    const parts = 1 + Math.floor(next() * 2.4);
    const word: Word = [];
    for (let p = 0; p < parts; p++) {
      const kind = pick(next, KINDS);
      // Round shapes are as wide as they are tall; a bar is the only one that
      // carries a length, and it is what gives a word its size.
      const width =
        kind === "bar" ? 11 + Math.round(next() * 20)
        : kind === "block" ? 10 + Math.round(next() * 7)
        : 9;
      word.push({ kind, width, color: pick(next, INK) });
    }
    words.push(word);
  }

  return words;
};
