import { createCopyControl, type CopyControl } from "@component-utils/copyButton";

function copyFallback(text: string): boolean {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");

  textarea.remove();
  return copied;
}

const controls = new WeakMap<HTMLButtonElement, CopyControl>();

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Clipboard access may be unavailable outside a secure context. Fall back
    // to the browser's legacy copy command for these older environments.
  }

  return copyFallback(text);
}

function createCopyButton(container: HTMLElement): HTMLButtonElement {
  const control = createCopyControl("code-block-copy");

  container.querySelector(".code-block-header")?.append(control.root);
  controls.set(control.button, control);

  return control.button;
}

export function setupCodeBlock(block: HTMLElement): void {
  const container = block.querySelector<HTMLElement>(".code-block-inner");

  if (!container?.dataset.copyButton) return;

  const button =
    container.querySelector<HTMLButtonElement>(".code-block-copy .button-inner") ??
    createCopyButton(container);
  const control = controls.get(button);

  if (!control || button.dataset.copyInitialized === "true") return;
  button.dataset.copyInitialized = "true";

  button.addEventListener("click", async () => {
    const code = block.querySelector<HTMLElement>(".code-block-panel:not([hidden]) code");

    control.report(await copyText(code?.textContent || ""));
  });
}

export function setupAllCodeBlocks(root: ParentNode = document): void {
  const blocks = [
    ...(root instanceof HTMLElement && root.matches(".code-block") ? [root] : []),
    ...Array.from(root.querySelectorAll<HTMLElement>(".code-block")),
  ];

  blocks.forEach(setupCodeBlock);
}
