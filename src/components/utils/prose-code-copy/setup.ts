import { copyText } from "@core-elements/code-block/setup";
import { createCopyControl } from "@component-utils/copyButton";

/**
 * A copy button on the fenced code blocks in a body of prose.
 *
 * `CodeBlock` owns its own button; markdown writes a bare `pre`, and the
 * ported posts hold hundreds of them. The control is built by the shared
 * helper so the two read and behave the same.
 */
function decorate(pre: HTMLPreElement): void {
  if (pre.dataset.codeCopy === "true" || pre.closest(".code-block")) return;
  pre.dataset.codeCopy = "true";

  const wrapper = document.createElement("div");
  const control = createCopyControl("prose-code-copy");

  wrapper.className = "prose-code";
  pre.replaceWith(wrapper);
  wrapper.append(pre, control.root);

  control.button.addEventListener("click", async () => {
    control.report(await copyText(pre.querySelector("code")?.textContent || ""));
  });
}

export function setupProseCodeCopy(root: ParentNode = document): void {
  root.querySelectorAll<HTMLPreElement>(".prose pre").forEach(decorate);
}
