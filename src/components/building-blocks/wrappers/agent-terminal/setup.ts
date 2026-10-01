/**
 * Plays the terminal session.
 *
 * The component renders the finished session server-side, so the panel reads
 * correctly with no script, under reduced motion, or before it has ever been
 * scrolled to. This takes over only when it is going to do better than that.
 *
 * Used by `AgentTerminal.astro`'s inline script and by `editor-live-sync.js`,
 * where inline scripts do not run.
 */

/** How fast a command types, per character. */
const KEYSTROKE = 34;
/** The beat between finishing a command and it reporting back. */
const WORKING = 1100;
/** And between one step's last line and the next command. */
const BETWEEN = 900;
/** Before it starts over. */
const AGAIN = 2600;

type Step = { run?: string; done?: string[] };

const sleep = (ms: number) => new Promise((done) => setTimeout(done, ms));

export function setupAgentTerminal(root: HTMLElement): void {
  if (root.hasAttribute("data-terminal-initialized")) return;
  root.setAttribute("data-terminal-initialized", "");

  const body = root.querySelector<HTMLElement>("[data-agent-body]");
  const source = root.querySelector<HTMLElement>("[data-agent-script]");
  if (!body || !source) return;

  let steps: Step[] = [];
  try {
    steps = JSON.parse(source.textContent || "[]");
  } catch {
    // A script that will not parse is not worth animating: what is already
    // rendered is the finished session, which is the honest fallback.
    return;
  }
  if (!steps.length) return;

  // Asked once, not watched: a session that restarted itself halfway through
  // because someone changed a system setting is worse than one that does not.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const line = (kind: string, mark: string, text: string) => {
    const p = document.createElement("p");
    p.className = `agent-terminal-line is-${kind}`;
    const flag = document.createElement("span");
    flag.className = "agent-terminal-mark";
    flag.textContent = mark;
    p.append(flag, document.createTextNode(text));
    body.append(p);
    return p;
  };

  let stop = false;

  const play = async () => {
    while (!stop) {
      body.textContent = "";
      root.dataset.state = "idle";

      for (const step of steps) {
        if (stop) return;

        // Typed a character at a time, with a caret hanging off the end.
        const typed = line("run", ">", "");
        const text = document.createTextNode("");
        const caret = document.createElement("span");
        caret.className = "agent-terminal-caret";
        typed.append(text, caret);
        root.dataset.state = "typing";

        for (const letter of step.run ?? "") {
          if (stop) return;
          text.textContent += letter;
          await sleep(KEYSTROKE);
        }
        caret.remove();

        // The agents go to work, and keep going until the step reports back.
        root.dataset.state = "working";
        await sleep(WORKING);
        if (stop) return;

        root.dataset.state = "done";
        for (const done of step.done ?? []) {
          line("done", "✓", done);
          await sleep(180);
          if (stop) return;
        }

        await sleep(BETWEEN);
      }

      root.dataset.state = "idle";
      if (!root.hasAttribute("data-loop")) return;
      await sleep(AGAIN);
    }
  };

  /**
   * Only while it is on screen.
   *
   * A session typing itself out in a panel nobody is looking at is work for
   * nothing, and it would also have finished by the time anyone arrived.
   */
  let running = false;
  const watch = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // The agents breathe whenever the graphic is on screen, which is what
        // the CSS keys off: a pulse switched on for one beat and off again
        // gets torn away mid-travel.
        if (entry.isIntersecting) root.setAttribute("data-visible", "");
        else root.removeAttribute("data-visible");

        if (entry.isIntersecting && !running) {
          running = true;
          stop = false;
          play().finally(() => {
            running = false;
          });
        } else if (!entry.isIntersecting && running) {
          stop = true;
        }
      }
    },
    { threshold: 0.35 },
  );
  watch.observe(root);
}

export function setupAllAgentTerminals(scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>("[data-agent-terminal]").forEach(setupAgentTerminal);
}
