import faqs from "@data/faqs.json";

/**
 * The questions filed under one topic in `src/data/faqs.json`, as accordion
 * items.
 *
 * `null` rather than `[]` where no topic is named, so a section can tell "use
 * the data file and it is empty" from "use my own items".
 *
 * The data file writes an answer as one markdown string; the accordion takes
 * content blocks, so each answer becomes a Text block here rather than in
 * every caller.
 *
 * @param {string} category
 * @returns {Array<object> | null}
 */
export function faqItemsFor(category) {
  if (typeof category !== "string" || !category.trim()) return null;

  const topic = (faqs.sections ?? []).find((section) => section?.category === category);

  return (topic?.items ?? []).map((item) => ({
    title: item?.title ?? "",
    contentSections: [
      {
        _component: "building-blocks/core-elements/text",
        text: item?.answer ?? "",
        alignmentHorizontal: "start",
        size: "lg",
      },
    ],
  }));
}

/** Every topic in the data file, in the order the file writes them. */
export function faqTopics() {
  return (faqs.sections ?? []).filter((section) => section?.category);
}
