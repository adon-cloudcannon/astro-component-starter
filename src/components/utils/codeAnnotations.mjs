/**
 * Numbered notes against lines of code.
 *
 * A code sample marks a line with `^^^1^^^` and a note elsewhere on the page
 * claims the same number. The marker is pulled out of the source before the
 * highlighter sees it — so it never colours a token, and never lands on the
 * clipboard — and comes back as a chip at the end of its line.
 *
 * Carried over from the old marketing site, which drew the same chips. The
 * marker is deliberately ugly: it has to be something no real line of code
 * would hold.
 */
const MARKER = /\^\^\^(\d+|\*)\^\^\^/g;

/** A Shiki transformer. One per highlight call: it holds that block's lines. */
export function codeAnnotations() {
  /** 1-based line number -> the numbers marked on it. */
  let byLine = new Map();

  return {
    name: "code-annotations",

    preprocess(code) {
      byLine = new Map();

      if (!code.includes("^^^")) return code;

      return code
        .split("\n")
        .map((text, index) => {
          const line = index + 1;

          return text
            .replace(MARKER, (_match, number) => {
              byLine.set(line, [...(byLine.get(line) ?? []), number]);

              return "";
            })
            .replace(/[ \t]+$/, "");
        })
        .join("\n");
    },

    line(node, line) {
      const numbers = byLine.get(line);

      if (!numbers) return;

      for (const number of numbers) {
        node.children.push({
          type: "element",
          tagName: "button",
          properties: {
            type: "button",
            class: "code-annotation",
            "data-annotation": number,
            "aria-label": `Show note ${number}`,
          },
          children: [{ type: "text", value: number }],
        });
      }
    },
  };
}
