/**
 * Plays the conversation.
 *
 * The component renders the whole thread server-side, settled, which is what
 * reads correctly with no script, under reduced motion, or before anyone has
 * scrolled to it. This takes over only when it is going to do better.
 *
 * It does not replay the thread, it keeps having it: the rendered messages are
 * kept as templates and appended in turn, over and over, so the conversation
 * only ever travels upwards. Replaying a fixed set instead meant the thread
 * emptied itself every fourth message, which reads as a reset rather than as a
 * conversation.
 *
 * Each message opens its own row with a CSS transition from `0fr` to `1fr`, so
 * the rise is the browser's and this only ever appends a node and flips an
 * attribute. Rows that have left through the top are dropped; because the
 * stack is anchored to its foot, taking one off the top moves nothing.
 */

/** The beat between one message landing and the next starting. */
const BETWEEN = 1500;
/** How many messages are kept. The thread shows three or four of them. */
const KEEP = 7;

const sleep = (ms: number) => new Promise((done) => setTimeout(done, ms));
/* Two frames: one for the row to exist shut, one for the browser to notice it
   changed. In a single frame there is nothing to transition from. */
const frame = () =>
  new Promise<void>((done) => requestAnimationFrame(() => requestAnimationFrame(() => done())));

export function setupCharacterChat(root: HTMLElement): void {
  if (root.hasAttribute("data-chat-initialized")) return;
  root.setAttribute("data-chat-initialized", "");

  const stack = root.querySelector<HTMLElement>("[data-thread]");
  if (!stack) return;

  const templates = [...stack.querySelectorAll<HTMLElement>(".character-chat-row")].map(
    (row) => row.cloneNode(true) as HTMLElement,
  );
  if (templates.length < 2) return;

  // The settled thread, to put back when it goes off screen.
  const settled = stack.innerHTML;

  // Asked once, not watched: a conversation that restarted itself halfway
  // through because someone changed a system setting is worse than one that
  // does not.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let stop = false;
  let at = 0;

  /** How many messages are already up when it comes into view. */
  const SEEDED = 3;

  const play = async () => {
    stack.textContent = "";

    // Arrive mid-conversation. Appended with their rows already open, so there
    // is nothing to transition from and they are simply there: scrolled to, it
    // is a conversation in full swing rather than one starting from an empty
    // panel because somebody happened to look.
    for (let i = 0; i < SEEDED; i++) {
      const row = templates[at % templates.length].cloneNode(true) as HTMLElement;
      row.setAttribute("data-shown", "");
      at++;
      stack.append(row);
    }

    while (!stop) {
      const row = templates[at % templates.length].cloneNode(true) as HTMLElement;
      row.removeAttribute("data-shown");
      at++;

      stack.append(row);
      await frame();
      if (stop) return;
      row.setAttribute("data-shown", "");

      while (stack.children.length > KEEP) stack.firstElementChild?.remove();

      await sleep(BETWEEN);
    }
  };

  /**
   * Only while it is on screen.
   *
   * A conversation playing to nobody is work for nothing.
   */
  let running = false;
  const watch = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !running) {
          running = true;
          stop = false;
          stack.setAttribute("data-playing", "");
          play().finally(() => {
            running = false;
          });
        } else if (!entry.isIntersecting && running) {
          stop = true;
          stack.removeAttribute("data-playing");
          stack.innerHTML = settled;
        }
      }
    },
    { threshold: 0.3 },
  );
  watch.observe(root);
}

export function setupAllCharacterChats(scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>(".character-chat[data-conversation]").forEach(setupCharacterChat);
}
