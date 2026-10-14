/**
 * The copy control a code sample carries, wherever it is drawn.
 *
 * Shared by the Code Block component and by the fenced blocks in prose so the
 * two cannot drift. The icons are inline rather than fetched: the button is
 * built after the page has rendered, and a request per code block to draw a
 * 16px glyph is not worth making.
 */
const ICON =
  '<svg class="copy-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const COPY_ICON = `${ICON}<rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>`;
const CHECK_ICON = `${ICON.replace("copy-glyph", "copy-glyph is-done")}<path d="M20 6 9 17l-5-5" /></svg>`;

const COPY_LABEL = "Copy code";
const COPIED_LABEL = "Copied";
const FAILED_LABEL = "Copy failed";

export type CopyControl = {
  root: HTMLSpanElement;
  button: HTMLButtonElement;
  /** Shows the outcome on the button and announces it. */
  report: (_copied: boolean) => void;
};

export function createCopyControl(className: string): CopyControl {
  const root = document.createElement("span");
  const button = document.createElement("button");
  const status = document.createElement("span");

  root.className = `button ${className}`;
  button.className = "button-inner variant-ghost size-sm";
  button.type = "button";
  button.innerHTML = COPY_ICON + CHECK_ICON;
  button.setAttribute("aria-label", COPY_LABEL);
  button.title = COPY_LABEL;
  status.className = "visually-hidden";
  status.setAttribute("role", "status");

  root.append(button, status);

  const report = (copied: boolean) => {
    const label = copied ? COPIED_LABEL : FAILED_LABEL;

    button.dataset.copied = copied ? "true" : "false";
    button.setAttribute("aria-label", label);
    button.title = label;
    status.textContent = copied ? "Code copied to clipboard." : "Unable to copy code.";

    window.setTimeout(() => {
      delete button.dataset.copied;
      button.setAttribute("aria-label", COPY_LABEL);
      button.title = COPY_LABEL;
    }, 1500);
  };

  return { root, button, report };
}
