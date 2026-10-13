/**
 * The FAQ browser's search.
 *
 * The pills need no script — they are radios and the CSS counts them — but a
 * search box does. While there is something in it the section shows every
 * topic at once and hides the cards that do not match, because the question
 * someone is looking for may be filed anywhere; empty, the pills take over
 * again and the CSS is back in charge.
 *
 * In its own module and registered in `editor-live-sync.js`: an inline
 * `<script>` never runs in the CloudCannon editor.
 */
const SELECTOR = ".faq-browser";

function matches(item: HTMLElement, needle: string): boolean {
  return item.textContent?.toLowerCase().includes(needle) ?? false;
}

export function setupFaqBrowser(section: HTMLElement): void {
  const input = section.querySelector<HTMLInputElement>(".faq-browser-search-input");

  if (!input || input.dataset.faqBrowserReady === "true") return;
  input.dataset.faqBrowserReady = "true";

  const empty = section.querySelector<HTMLElement>(".faq-browser-empty");
  const items = [...section.querySelectorAll<HTMLElement>(".accordion-item")];

  const apply = (): void => {
    const needle = input.value.trim().toLowerCase();

    if (!needle) {
      section.removeAttribute("data-searching");
      for (const item of items) item.hidden = false;
      if (empty) empty.hidden = true;
      return;
    }

    section.setAttribute("data-searching", "");

    let hits = 0;
    for (const item of items) {
      const hit = matches(item, needle);
      item.hidden = !hit;
      if (hit) hits += 1;
    }

    if (empty) empty.hidden = hits > 0;
  };

  input.addEventListener("input", apply);
  apply();
}

export function setupAllFaqBrowsers(root: ParentNode = document): void {
  for (const section of root.querySelectorAll<HTMLElement>(SELECTOR)) setupFaqBrowser(section);
}
