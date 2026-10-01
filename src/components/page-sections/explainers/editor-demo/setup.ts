/**
 * The editor demo's dropdown.
 *
 * Built rather than native: the app draws its own and a system `<select>`
 * cannot be styled to match it. That trade has a cost, which is this file.
 * A native select gives keyboard support, typeahead and the platform's own
 * dropdown for free, so a hand-built one has to put those back or it is a
 * worse control that merely looks better.
 *
 * Used by `EditorDemo.astro`'s inline script and by `editor-live-sync.js`,
 * where inline scripts do not run. Without it the trigger shows the first
 * value and nothing opens, which is the right thing to degrade to.
 */

const OPTION = ".editor-demo-select-option";

/** Where the app would put a file when the field is pointing nowhere. */
const UPLOAD_FOLDER = "/src/assets/images/";

function options(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(OPTION)];
}

export function setupEditorDemoSelect(root: HTMLElement): void {
  if (root.hasAttribute("data-select-initialized")) return;
  root.setAttribute("data-select-initialized", "");

  const trigger = root.querySelector<HTMLButtonElement>(".editor-demo-select-trigger");
  const list = root.querySelector<HTMLElement>(".editor-demo-select-list");
  const value = root.querySelector<HTMLElement>(".editor-demo-select-value");
  if (!trigger || !list || !value) return;

  const items = options(root);
  if (!items.length) return;

  /**
   * The preview's colour.
   *
   * Written as a custom property on the stage rather than on the preview
   * itself, so anything else in the window that wants to follow the page's
   * colour reads the same value.
   */
  const stage = root.closest<HTMLElement>(".editor-demo-stage");
  const paint = (option: HTMLElement) => {
    const colour = option.dataset.color;
    if (stage && colour) stage.style.setProperty("--editor-demo-preview-bg", colour);
  };

  let active = Math.max(
    0,
    items.findIndex((item) => item.getAttribute("aria-selected") === "true"),
  );

  /**
   * Whether anything is marked yet.
   *
   * Opening marks nothing: the blue bed means "the pointer or the keyboard is
   * on this", and on open neither is. Marking the selected row made it look
   * hovered the instant the list appeared. `active` still remembers where the
   * keyboard would start from.
   */
  let marked = false;

  /**
   * Which option the keyboard is on.
   *
   * `aria-activedescendant` rather than moving focus into the list: focus
   * stays on the trigger, so Escape and Tab behave the way they do on a real
   * combobox and nothing has to be handed back afterwards.
   */
  const mark = (index: number) => {
    active = (index + items.length) % items.length;
    marked = true;
    items.forEach((item, at) => item.toggleAttribute("data-active", at === active));
    trigger.setAttribute("aria-activedescendant", items[active].id);
    items[active].scrollIntoView({ block: "nearest" });
  };

  /**
   * The first arrow press after opening lands on the selected row rather than
   * stepping past it, which is where someone expects to start.
   */
  const step = (by: number) => (marked ? mark(active + by) : mark(active));

  const open = () => {
    list.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    list.hidden = true;
    marked = false;
    trigger.setAttribute("aria-expanded", "false");
    trigger.removeAttribute("aria-activedescendant");
    items.forEach((item) => item.removeAttribute("data-active"));
  };

  const choose = (index: number) => {
    const chosen = items[index];
    items.forEach((item) => item.setAttribute("aria-selected", String(item === chosen)));
    value.textContent = chosen.dataset.value ?? chosen.textContent ?? "";
    active = index;
    close();
    trigger.focus();
    paint(chosen);
    // What anything else listens to. The control does not know what it drives.
    root.dispatchEvent(
      new CustomEvent("editor-demo:change", {
        bubbles: true,
        detail: { value: chosen.dataset.value ?? "", color: chosen.dataset.color ?? "" },
      }),
    );
  };

  trigger.addEventListener("click", () => {
    if (list.hidden) open();
    else close();
  });

  trigger.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (list.hidden) open();
        else step(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (list.hidden) open();
        else step(-1);
        break;
      case "Home":
        if (!list.hidden) {
          event.preventDefault();
          mark(0);
        }
        break;
      case "End":
        if (!list.hidden) {
          event.preventDefault();
          mark(items.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        // Nothing marked means nothing was chosen: the list just shuts.
        if (list.hidden) open();
        else if (marked) choose(active);
        else close();
        break;
      case "Escape":
        if (!list.hidden) {
          event.preventDefault();
          close();
        }
        break;
      default:
        // Typeahead, which a native select gives you and this would not.
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
          const from = list.hidden ? 0 : active + 1;
          const order = items.map((_, at) => (from + at) % items.length);
          const hit = order.find((at) =>
            (items[at].textContent ?? "").trim().toLowerCase().startsWith(event.key.toLowerCase()),
          );
          if (hit !== undefined) {
            if (list.hidden) choose(hit);
            else mark(hit);
          }
        }
    }
  });

  items.forEach((item, index) => {
    item.addEventListener("click", () => choose(index));
    item.addEventListener("pointermove", () => {
      if (!list.hidden) mark(index);
    });
  });

  // A click anywhere else shuts it, the way every dropdown behaves.
  document.addEventListener("pointerdown", (event) => {
    if (!list.hidden && !root.contains(event.target as Node)) close();
  });

  // And so does tabbing out of it.
  trigger.addEventListener("blur", (event) => {
    if (!root.contains(event.relatedTarget as Node)) close();
  });
}

export function setupAllEditorDemoSelects(scope: ParentNode = document): void {
  scope
    .querySelectorAll<HTMLElement>("[data-editor-demo-select]")
    .forEach(setupEditorDemoSelect);
}

/**
 * The app's image field.
 *
 * A path, a key that clears it, a key that puts something else there, and
 * what is there now underneath. Nothing is uploaded: the plus opens the
 * machine's own file picker and the chosen file is read straight into the
 * page through an object URL, which is the visible half of an upload with no
 * server to do the other half on.
 *
 * The path is editable, because it is in the editor, and a typed one is only
 * taken once it is known to load. A demo that answers a typo with a broken
 * image reads as the demo being broken.
 *
 * This field exists twice over, once in the sidebar's pane and once in the
 * popup, so a change made in one has to reach the other. `commit` is the only
 * way state changes: it draws this copy, puts the picture on the page, and
 * announces itself, and every other copy of the same field redraws from that.
 */
function setupEditorDemoFile(
  box: HTMLElement,
  media: HTMLElement | null,
  held: Record<string, string>,
  stage: HTMLElement,
): void {
  const path = box.querySelector<HTMLInputElement>(".editor-demo-file-path");
  const picker = box.querySelector<HTMLInputElement>('input[type="file"]');
  const shown = box.querySelector<HTMLElement>(".editor-demo-file-shown");
  const drop = box.querySelector<HTMLButtonElement>(".editor-demo-file-drop");
  const clear = box.querySelector<HTMLButtonElement>("[data-clears]");
  const name = box.dataset.binds ?? "image";
  if (!path || !picker || !shown) return;

  /** The last path that drew something, which a failed edit falls back to. */
  let good = path.value;

  /**
   * A <picture> settles on a <source> before the <img> is ever consulted, so
   * the build's webp beats anything written to `src` and the swap does
   * nothing at all in a browser that takes webp, which is all of them. Once
   * the field has been touched the built sources describe a different file,
   * so they go.
   */
  const plain = (scope: ParentNode | null | undefined) => {
    scope?.querySelectorAll("source").forEach((source) => source.remove());
  };

  /** Draws this copy of the field, and nothing else. */
  const render = (src: string) => {
    if (!src) {
      shown.hidden = true;
      if (drop) drop.hidden = false;
      if (clear) clear.hidden = true;
      return;
    }
    plain(shown);
    let thumb = shown.querySelector("img");
    if (!thumb) {
      // The field started empty, so there is no picture to reuse: what was
      // rendered is the empty state and nothing else.
      thumb = document.createElement("img");
      thumb.alt = "";
      shown.append(thumb);
    }
    thumb.removeAttribute("srcset");
    thumb.removeAttribute("sizes");
    thumb.src = src;
    shown.hidden = false;
    if (drop) drop.hidden = true;
    if (clear) clear.hidden = false;
  };

  /** Puts it on the page the demo is editing. */
  const onto = (src: string) => {
    if (!media) return;
    if (src) {
      let img = media.querySelector("img");
      if (!img) {
        // A block added from the menu starts with no picture at all, so the
        // first one chosen has to be made rather than swapped.
        img = document.createElement("img");
        img.alt = "";
        media.prepend(img);
      }
      plain(media);
      // Width, height and sizes describe the file the build optimised, not
      // this one: left on, a portrait photo draws in the old one's box.
      ["srcset", "sizes", "width", "height"].forEach((attr) => img.removeAttribute(attr));
      img.src = src;
    }
    media.hidden = !src;
  };

  /** A change made here. Everything that changes state goes through this. */
  const commit = (next: string, src: string) => {
    good = next;
    path.value = next;
    render(src);
    onto(src);
    box.dispatchEvent(
      new CustomEvent("editor-demo:image", {
        bubbles: true,
        detail: { name, path: next, src, from: box },
      }),
    );
  };

  // What another copy of this field did. Drawn, not re-committed: the page is
  // already showing it, and announcing it again would bounce between copies.
  stage.addEventListener("editor-demo:image", (event) => {
    const detail = (event as CustomEvent).detail;
    if (!detail || detail.from === box || detail.name !== name) return;
    good = detail.path;
    path.value = detail.path;
    render(detail.src);
  });

  /** A chosen file, however it arrived: the picker or a drop. */
  const take = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;

    // One URL per field, shared by its copies, so whichever one replaces the
    // picture releases what was there before wherever it was made.
    if (held[name]) URL.revokeObjectURL(held[name]);
    held[name] = URL.createObjectURL(file);
    // The path the editor would write: the folder the field already points
    // at, with the chosen file's name on the end.
    commit((good.replace(/[^/]*$/, "") || UPLOAD_FOLDER) + file.name, held[name]);
  };

  const pick = () => picker.click();
  box.querySelector<HTMLButtonElement>("[data-uploads]")?.addEventListener("click", pick);
  drop?.addEventListener("click", pick);

  picker.addEventListener("change", () => {
    const file = picker.files?.[0];
    // Emptied first, so choosing the same file twice still counts as a change.
    picker.value = "";
    take(file);
  });

  clear?.addEventListener("click", () => {
    if (held[name]) URL.revokeObjectURL(held[name]);
    held[name] = "";
    commit("", "");
    path.focus();
  });

  /**
   * And dropped, because the empty state says so.
   *
   * `dragover` has to be prevented as well as `drop`, or the browser keeps
   * the default it would otherwise do, which is to navigate away from the
   * page and open the file on its own.
   *
   * `dragleave` fires crossing into a child as well as out of the field, so
   * the mark is cleared on a leave that is genuinely outside it.
   */
  box.addEventListener("dragover", (event) => {
    event.preventDefault();
    box.setAttribute("data-dropping", "");
  });

  box.addEventListener("dragleave", (event) => {
    if (!box.contains(event.relatedTarget as Node)) box.removeAttribute("data-dropping");
  });

  box.addEventListener("drop", (event) => {
    event.preventDefault();
    box.removeAttribute("data-dropping");
    take(event.dataTransfer?.files?.[0]);
  });

  // On change rather than on input: a path is only a path once it is finished
  // being typed, and every prefix of one is a miss.
  path.addEventListener("change", () => {
    const value = path.value.trim();
    if (!value) {
      commit("", "");
      return;
    }
    const probe = new Image();
    probe.addEventListener("load", () => commit(value, value));
    probe.addEventListener("error", () => {
      path.value = good;
    });
    probe.src = value;
  });
}

/**
 * The button that adds a block, and the list it opens.
 *
 * A menu, not a listbox: picking one does something rather than setting a
 * value, so the items are buttons and focus moves to them. That is the one
 * place this differs from the colour dropdown, which keeps focus on its
 * trigger because a listbox's selection follows the keyboard.
 *
 * Which way it opens is measured, not assumed. The button sits near the foot
 * of the sidebar and the sidebar clips, so a list that only ever dropped
 * would be cut off by it every time.
 */
export function setupEditorDemoAddMenu(root: HTMLElement): void {
  if (root.hasAttribute("data-add-initialized")) return;
  root.setAttribute("data-add-initialized", "");

  const trigger = root.querySelector<HTMLButtonElement>(".editor-demo-add");
  const list = root.querySelector<HTMLElement>(".editor-demo-add-list");
  if (!trigger || !list) return;

  const items = [...list.querySelectorAll<HTMLButtonElement>(".editor-demo-add-option")];
  if (!items.length) return;

  /** Down by default, up when down would not fit inside what clips it. */
  const place = () => {
    list.dataset.drop = "down";
    const clip = root.closest(".editor-demo-sidebar") ?? root.closest(".editor-demo-stage");
    const bounds = clip?.getBoundingClientRect();
    if (!bounds) return;
    const button = trigger.getBoundingClientRect();
    const height = list.getBoundingClientRect().height;
    const roomBelow = bounds.bottom - button.bottom;
    const roomAbove = button.top - bounds.top;
    if (height + 4 > roomBelow && roomAbove > roomBelow) list.dataset.drop = "up";
  };

  const open = (at = 0) => {
    list.hidden = false;
    // Placed after it is rendered: a hidden list has no height to measure.
    place();
    trigger.setAttribute("aria-expanded", "true");
    items[at]?.focus();
  };

  const close = (toTrigger = true) => {
    if (list.hidden) return;
    list.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (toTrigger) trigger.focus();
  };

  const step = (from: number, by: number) => {
    items[(from + by + items.length) % items.length]?.focus();
  };

  trigger.addEventListener("click", () => {
    if (list.hidden) open();
    else close();
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      // Up opens onto the last item, which is where the eye is going.
      open(event.key === "ArrowUp" ? items.length - 1 : 0);
    }
  });

  items.forEach((item, index) => {
    item.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          step(index, 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          step(index, -1);
          break;
        case "Home":
          event.preventDefault();
          items[0]?.focus();
          break;
        case "End":
          event.preventDefault();
          items[items.length - 1]?.focus();
          break;
        case "Escape":
          event.preventDefault();
          close();
          break;
        case "Tab":
          // Tabbing out of a menu shuts it, and lets the tab happen.
          close(false);
          break;
      }
    });

    item.addEventListener("click", () => {
      close();
      // What anything else listens to. The menu does not know what it adds.
      root.dispatchEvent(
        new CustomEvent("editor-demo:add", {
          bubbles: true,
          detail: {
            index,
            title: item.querySelector(".editor-demo-add-name")?.textContent ?? "",
          },
        }),
      );
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!list.hidden && !root.contains(event.target as Node)) close(false);
  });
}

export function setupAllEditorDemoAddMenus(scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>("[data-editor-demo-add]").forEach(setupEditorDemoAddMenu);
}

/**
 * The sidebar's panes, the popup on the page, and adding a block.
 *
 * Everything works from a block's instance id, never its position. A list you
 * can add to has no stable positions, and `data-opens`, `data-pane`,
 * `data-block`, `data-binds` and `data-edits` all carry the same id, so a
 * field, its row, its panel, its copy in the popup and the paragraph it
 * writes to on the page can always find each other.
 */
export function setupEditorDemoPanes(sidebar: HTMLElement): void {
  if (sidebar.hasAttribute("data-panes-initialized")) return;
  sidebar.setAttribute("data-panes-initialized", "");

  const track = sidebar.querySelector<HTMLElement>(".editor-demo-panes");
  const root = sidebar.querySelector<HTMLElement>('.editor-demo-pane[data-pane="root"]');
  const stage = sidebar.closest<HTMLElement>(".editor-demo-stage");
  if (!track || !root || !stage) return;

  /** The page the demo edits, and the panel it scrolls inside. */
  const page = stage.querySelector<HTMLElement>(".editor-demo-page");
  const panel = stage.querySelector<HTMLElement>(".editor-demo-preview");
  const list = sidebar.querySelector<HTMLElement>(".editor-demo-blocks");
  const popup = stage.querySelector<HTMLElement>(".editor-demo-popup");
  const popupBody = popup?.querySelector<HTMLElement>(".editor-demo-popup-body") ?? null;
  const popupTitle = popup?.querySelector<HTMLElement>(".editor-demo-popup-title") ?? null;

  const paneFor = (id: string) =>
    track.querySelector<HTMLElement>(`.editor-demo-pane[data-pane="${id}"]`);
  const rowFor = (id: string) => sidebar.querySelector<HTMLElement>(`[data-opens="${id}"]`);
  const liFor = (id: string) =>
    sidebar.querySelector<HTMLElement>(`li.editor-demo-block[data-block="${id}"]`);
  const contentFor = (id: string) =>
    page?.querySelector<HTMLElement>(`.editor-demo-block-content[data-block="${id}"]`) ?? null;
  const order = () =>
    list
      ? [...list.querySelectorAll<HTMLElement>("li.editor-demo-block")].map((li) => li.dataset.block ?? "")
      : [];
  const groupFor = (id: string) =>
    popupBody?.querySelector<HTMLElement>(`.editor-demo-fields[data-block="${id}"]`) ?? null;
  const mediaFor = (id: string) =>
    page?.querySelector<HTMLElement>(`.editor-demo-preview-media[data-block="${id}"]`) ?? null;
  const panes = () =>
    [...track.querySelectorAll<HTMLElement>(".editor-demo-pane")].filter(
      (pane) => pane.dataset.pane !== "root",
    );
  const popupGroups = () =>
    popupBody ? [...popupBody.querySelectorAll<HTMLElement>(".editor-demo-fields")] : [];

  /**
   * A selector over a subtree, including the subtree's own root.
   *
   * `querySelectorAll` only ever looks downwards, and a block added from the
   * template arrives as the very elements that need wiring: the picture's
   * wrapper carries `data-edits` on itself, so a search that skipped the root
   * would leave it dead.
   */
  const all = <T extends Element>(scope: ParentNode, selector: string): T[] => {
    const found = [...scope.querySelectorAll<T>(selector)];
    if (scope instanceof Element && scope.matches(selector)) found.unshift(scope as unknown as T);
    return found;
  };

  /** Attaches a handler once, however many times the element is passed. */
  const once = (el: Element) => {
    if (el.hasAttribute("data-wired")) return false;
    el.setAttribute("data-wired", "");
    return true;
  };

  /** One object URL per field, shared by that field's two copies. */
  const held: Record<string, string> = {};

  /**
   * Writes a value into every copy of a field but the one it came from.
   *
   * Inputs and textareas only. The image field's box carries `data-binds` too
   * and it is a div holding its own state, which `editor-demo:image` handles.
   */
  const mirror = (bind: string, value: string, except?: Element) => {
    if (!bind) return;
    stage
      .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        `input[data-binds="${bind}"], textarea[data-binds="${bind}"]`,
      )
      .forEach((field) => {
        if (field !== except) field.value = value;
      });
  };

  /** `id` is a block's, or null for the list. */
  const show = (id: string | null) => {
    track.style.setProperty("--editor-demo-open", id ? "1" : "0");
    root.inert = Boolean(id);
    panes().forEach((pane) => {
      const open = pane.dataset.pane === id;
      pane.hidden = !open;
      pane.inert = !open;
    });
  };

  const openPane = (id: string) => {
    const pane = paneFor(id);
    if (!pane) return;
    show(id);
    // Focus follows the pane, with preventScroll: focusing something still
    // off-screen makes the sidebar scroll sideways to reveal it, which fights
    // the slide all the way across.
    pane
      .querySelector<HTMLElement>('input:not([type="file"]), textarea, .editor-demo-back')
      ?.focus({ preventScroll: true });
  };

  /** What to hand focus back to, and whether a keyboard asked for it. */
  let popupOpener: HTMLElement | null = null;
  let popupByKeyboard = false;

  /**
   * `byKeyboard` says how the close happened, not how the open did.
   *
   * Focus only goes back to the pencil when a keyboard was involved at one
   * end or the other. Handing it back after a mouse click left the pencil
   * focused, and the corner menu is revealed by `focus-within` as well as by
   * hover, so it stayed up over a picture the pointer had long since left.
   */
  const closePopup = (byKeyboard = false) => {
    if (!popup || popup.hidden) return;
    const opener = popupOpener;
    const restore = byKeyboard || popupByKeyboard;
    popup.hidden = true;
    popupGroups().forEach((group) => {
      group.hidden = true;
      group.inert = true;
    });
    popupOpener = null;
    popupByKeyboard = false;
    if (restore) opener?.focus();
  };

  const openPopup = (id: string, opener: HTMLElement, byKeyboard: boolean) => {
    const pane = paneFor(id);
    const group = groupFor(id);
    if (!pane || !group || !popup || !popupBody) return;

    // The sidebar is left exactly as it is. Both panels are real, so one
    // opening is not a reason for the other to close.
    if (popupTitle) {
      popupTitle.textContent = pane.querySelector(".editor-demo-panel-title")?.textContent ?? "";
    }
    popupGroups().forEach((other) => {
      other.hidden = other !== group;
      other.inert = other !== group;
    });
    popup.hidden = false;
    popupOpener = opener;
    popupByKeyboard = byKeyboard;
    // The first field, not the close button. Searched inside the body rather
    // than the whole popup: the close sits before the fields in document
    // order, so a query over the popup finds it first.
    (
      group.querySelector<HTMLElement>('input:not([type="file"]), textarea') ??
      popup.querySelector<HTMLElement>(".editor-demo-popup-close")
    )?.focus({ preventScroll: true });
  };

  /**
   * Everything a block needs, attached to whatever subtree it is given.
   *
   * Called once over the whole stage and again over each block arriving from
   * the add menu, which is why every handler is keyed off an id read out of
   * the DOM rather than captured when the page loaded.
   */
  const wire = (scope: ParentNode) => {
    all<HTMLElement>(scope, "[data-opens]").forEach((opener) => {
      if (!once(opener)) return;
      opener.addEventListener("click", () => openPane(opener.dataset.opens ?? ""));
    });

    all<HTMLButtonElement>(scope, ".editor-demo-back").forEach((back) => {
      if (!once(back)) return;
      back.addEventListener("click", () => {
        // Back to the row that opened it, not the top of the sidebar.
        const id = back.closest<HTMLElement>(".editor-demo-pane")?.dataset.pane ?? "";
        show(null);
        rowFor(id)?.focus();
      });
    });

    all<HTMLElement>(scope, "[data-opens-media]").forEach((tool) => {
      if (!once(tool)) return;
      tool.addEventListener("click", (event) => {
        openPopup(tool.dataset.opensMedia ?? "", tool, (event as MouseEvent).detail === 0);
      });
    });

    // Typing edits the page, which is the whole point of the demo, and the
    // other panel's copy of the same field, which is what keeps the two from
    // drifting apart while both are open.
    all<HTMLInputElement | HTMLTextAreaElement>(
      scope,
      "input[data-binds], textarea[data-binds]",
    ).forEach((field) => {
      if (!once(field)) return;
      field.addEventListener("input", () => {
        const bind = field.dataset.binds ?? "";
        const target = page?.querySelector<HTMLElement>(`[data-edits="${bind}"]`);
        if (target) target.textContent = field.value;
        mirror(bind, field.value, field);
      });
    });

    /**
     * And the other way, for anything editable on the page itself.
     *
     * `innerText`, not `textContent`. A plaintext-only contenteditable writes
     * a line break as a <br>, which contributes nothing to `textContent`:
     * pressing Enter in the description put a break on the page and sent the
     * sidebar a single run-on line.
     *
     * No loop to guard against: setting an input's `value` from script does
     * not fire `input`, so this cannot come back round.
     */
    all<HTMLElement>(scope, "[data-edits]").forEach((live) => {
      if (!once(live)) return;
      live.addEventListener("input", () => {
        mirror(live.dataset.edits ?? "", live.innerText ?? live.textContent ?? "");
      });
    });

    all<HTMLElement>(scope, ".editor-demo-grip").forEach((grip) => {
      if (!once(grip)) return;
      grip.addEventListener("click", () => {
        const id = grip.closest<HTMLElement>("[data-block]")?.dataset.block ?? "";
        if (!menu) return;
        if (!menu.hidden && menuFor === id) closeMenu(true);
        else openMenu(id, grip);
      });
    });

    all<HTMLElement>(scope, ".editor-demo-file").forEach((box) => {
      if (!once(box)) return;
      const id = box.closest<HTMLElement>("[data-block]")?.dataset.block ?? "";
      setupEditorDemoFile(box, mediaFor(id), held, stage);
    });
  };

  popup?.querySelector(".editor-demo-popup-close")?.addEventListener("click", (event) => {
    closePopup((event as MouseEvent).detail === 0);
  });

  popup?.addEventListener("keydown", (event) => {
    if ((event as KeyboardEvent).key === "Escape") closePopup(true);
  });

  /**
   * A click elsewhere on the page shuts it. A click in the sidebar does not.
   *
   * The sidebar is the other panel, and in the editor both are open at once,
   * so working in one is not a way of dismissing the other. Clicking the page
   * behind the popup is: that is choosing something else to look at.
   */
  document.addEventListener("pointerdown", (event) => {
    if (!popup || popup.hidden || !panel) return;
    const target = event.target as Element | null;
    if (!panel.contains(target)) return;
    if (popup.contains(target) || target?.closest?.("[data-opens-media]")) return;
    closePopup(false);
  });

  /**
   * Adding a block.
   *
   * A block is four pieces in four places, and the template holds all four
   * with `__ID__` where its instance id goes. The substitution happens on the
   * markup, before it is parsed, so every piece comes out agreeing on the id
   * rather than being patched one attribute at a time afterwards.
   */
  let made = panes().length;
  const insertBlock = (which: number, beforeId = "") => {
    const template = stage.querySelector<HTMLTemplateElement>(
      `template[data-add-template="${which}"]`,
    );
    if (!template || !list || !popupBody || !page) return;

    const id = `b${made++}`;
    const holder = document.createElement("template");
    holder.innerHTML = template.innerHTML.replaceAll("__ID__", id);

    // The pane holds a copy of the fields too, so these are told apart by
    // being the fragment's own children rather than by selector alone.
    const parts = [...holder.content.children];
    const row = parts.find((el) => el.matches("li.editor-demo-block"));
    const pane = parts.find((el) => el.matches(".editor-demo-pane"));
    const group = parts.find((el) => el.matches(".editor-demo-fields"));
    const content = parts.filter((el) => el !== row && el !== pane && el !== group);

    // Before the block whose menu asked for it, which is where the editor
    // puts it, or at the end when the button under the list did. Only the row
    // and the content are ordered; a panel and a copy of the fields are found
    // by id, so where those sit is nothing.
    const beforeRow = beforeId ? liFor(beforeId) : null;
    const beforeContent = beforeId ? contentFor(beforeId) : null;
    if (row) (beforeRow ? beforeRow.before(row) : list.append(row));
    if (pane) track.append(pane);
    if (group) popupBody.append(group);
    content.forEach((el) => (beforeContent ? beforeContent.before(el) : page.append(el)));

    [row, pane, group, ...content].forEach((el) => el && wire(el));

    // The editor opens what it just made, which is also the proof it worked.
    openPane(id);
  };

  stage.addEventListener("editor-demo:add", (event) => {
    const detail = (event as CustomEvent).detail;
    if (detail && typeof detail.index === "number") insertBlock(detail.index);
  });

  /**
   * Duplicating, moving and deleting a block.
   *
   * A block is four pieces and these keep them together: the row and the
   * content are the two that carry an order, and the panel and the popup's
   * copy of the fields are found by id, so they are only ever added and
   * removed.
   */

  /** Writes what the fields are holding into the markup, so a copy carries it. */
  const freeze = (scope: Element) => {
    scope.querySelectorAll("input").forEach((input) => {
      if (input.type !== "file") input.setAttribute("value", input.value);
    });
    scope.querySelectorAll("textarea").forEach((area) => {
      area.textContent = area.value;
    });
  };

  /** A clone arrives already marked as wired, and would never be. */
  const scrub = (el: Element) => {
    el.removeAttribute("data-wired");
    el.querySelectorAll("[data-wired]").forEach((n) => n.removeAttribute("data-wired"));
    return el;
  };

  const duplicate = (id: string) => {
    const li = liFor(id);
    const pane = paneFor(id);
    const group = groupFor(id);
    const content = contentFor(id);
    if (!li || !pane || !group || !content || !list || !popupBody || !page) return;

    // Typing never reaches the markup: an input's `value` is a property, not
    // its attribute, so the copy has to be told what the original holds.
    [li, pane, group, content].forEach(freeze);

    const next = `b${made++}`;
    // On word boundaries, or duplicating b1 would rewrite b10 along with it.
    const pattern = new RegExp(`\\b${id}\\b`, "g");
    const copy = (el: Element) => {
      const holder = document.createElement("template");
      holder.innerHTML = el.outerHTML.replace(pattern, next);
      const clone = holder.content.firstElementChild;
      return clone ? scrub(clone) : null;
    };

    const parts = [copy(li), copy(pane), copy(group), copy(content)];
    const [newLi, newPane, newGroup, newContent] = parts;
    if (newLi) li.after(newLi);
    if (newPane) track.append(newPane);
    if (newGroup) popupBody.append(newGroup);
    if (newContent) content.after(newContent);
    parts.forEach((el) => el && wire(el));
  };

  const move = (id: string, by: number) => {
    const li = liFor(id);
    const content = contentFor(id);
    if (!li || !content) return;
    const nextLi = by < 0 ? li.previousElementSibling : li.nextElementSibling;
    const nextContent = by < 0 ? content.previousElementSibling : content.nextElementSibling;
    if (!nextLi || !nextContent) return;
    if (by < 0) {
      nextLi.before(li);
      nextContent.before(content);
    } else {
      nextLi.after(li);
      nextContent.after(content);
    }
  };

  const remove = (id: string) => {
    // Whatever this block was holding goes with it, or the object URL outlives
    // the only thing that was showing it.
    Object.keys(held).forEach((bind) => {
      if (!bind.startsWith(`${id}:`)) return;
      if (held[bind]) URL.revokeObjectURL(held[bind]);
      delete held[bind];
    });
    const pane = paneFor(id);
    if (pane && !pane.hidden) show(null);
    const group = groupFor(id);
    if (popup && !popup.hidden && group && !group.hidden) closePopup(false);
    liFor(id)?.remove();
    pane?.remove();
    group?.remove();
    contentFor(id)?.remove();
  };

  /** The six dots' menu, moved to whichever block asked for it. */
  const menu = stage.querySelector<HTMLElement>(".editor-demo-menu");
  const sub = menu?.querySelector<HTMLElement>(".editor-demo-menu-sub") ?? null;
  const addItem = menu?.querySelector<HTMLElement>('[data-menu="add"]') ?? null;
  let menuFor = "";
  let menuGrip: HTMLElement | null = null;

  const closeMenu = (toGrip = false) => {
    if (!menu || menu.hidden) return;
    const grip = menuGrip;
    menu.hidden = true;
    if (sub) sub.hidden = true;
    addItem?.setAttribute("aria-expanded", "false");
    grip?.setAttribute("aria-expanded", "false");
    menuFor = "";
    menuGrip = null;
    if (toGrip) grip?.focus();
  };

  /**
   * Placed against the grip, and flipped above it when there is no room
   * below, the same measure the add menu takes.
   *
   * Run again whenever the menu changes height. Opening the submenu adds two
   * rows to it, and a menu placed once at open time then grew off the foot of
   * the sidebar.
   */
  const place = () => {
    if (!menu || !menuGrip) return;
    // Against the window, not the sidebar: the menu lives out here so its
    // submenu can fly over the page.
    const host = stage.getBoundingClientRect();
    const box = menuGrip.getBoundingClientRect();
    const height = menu.getBoundingClientRect().height;
    const below = host.bottom - box.bottom;
    const wanted =
      height + 8 > below && box.top - host.top - height - 4 > 0
        ? box.top - host.top - height - 4
        : box.bottom - host.top + 4;
    // And held inside the window either way, so a grip near the foot of a
    // long list cannot push it off the end.
    menu.style.insetBlockStart = `${Math.max(8, Math.min(wanted, host.height - height - 8))}px`;
    menu.style.insetInlineEnd = `${Math.max(host.right - box.right, 8)}px`;
  };

  const openMenu = (id: string, grip: HTMLElement) => {
    if (!menu) return;
    menuFor = id;
    menuGrip = grip;
    grip.setAttribute("aria-expanded", "true");
    if (sub) sub.hidden = true;
    addItem?.setAttribute("aria-expanded", "false");

    // What this block cannot do is worked out each time it opens, because the
    // answer is its position and that changes under it.
    const at = order().indexOf(id);
    const count = order().length;
    const off = (name: string, disabled: boolean) => {
      const item = menu.querySelector<HTMLButtonElement>(`[data-menu="${name}"]`);
      if (item) item.disabled = disabled;
    };
    off("up", at <= 0);
    off("down", at < 0 || at >= count - 1);
    // A page with no blocks has no demo left in it.
    off("remove", count <= 1);

    menu.hidden = false;
    place();
    menu.querySelector<HTMLButtonElement>(".editor-demo-menu-item:not(:disabled)")?.focus();
  };

  menu?.addEventListener("click", (event) => {
    const item = (event.target as Element).closest<HTMLButtonElement>("[data-menu]");
    if (!item || item.disabled || !menu.contains(item)) return;
    const id = menuFor;

    if (item.dataset.menu === "add") {
      // Stays open: this one only reveals what it can add.
      const open = sub?.hidden ?? false;
      if (sub) {
        sub.hidden = !open;
        if (open) {
          // Out over the page when there is room for it there, and back over
          // the menu when there is not. Measured once it is rendered: a hidden
          // element has no width to go on.
          const host = stage.getBoundingClientRect();
          const edge = host.right - parseFloat(menu.style.insetInlineEnd || "0");
          sub.dataset.side = sub.offsetWidth + 8 > host.right - edge ? "start" : "end";
        }
      }
      item.setAttribute("aria-expanded", String(open));
      return;
    }

    switch (item.dataset.menu) {
      case "add-one":
        insertBlock(Number(item.dataset.which), id);
        break;
      case "duplicate":
        duplicate(id);
        break;
      case "up":
        move(id, -1);
        break;
      case "down":
        move(id, 1);
        break;
      case "remove":
        remove(id);
        break;
    }
    closeMenu();
  });

  menu?.addEventListener("keydown", (event) => {
    if ((event as KeyboardEvent).key === "Escape") closeMenu(true);
  });

  document.addEventListener("pointerdown", (event) => {
    if (!menu || menu.hidden) return;
    const target = event.target as Element | null;
    if (menu.contains(target) || target?.closest?.(".editor-demo-grip")) return;
    closeMenu();
  });

  // The menu is placed against the window, so scrolling the list underneath it
  // would leave it pointing at nothing.
  sidebar.addEventListener("scroll", () => closeMenu(), { passive: true });

  wire(stage);
  show(null);
}

export function setupAllEditorDemoPanes(scope: ParentNode = document): void {
  scope.querySelectorAll<HTMLElement>("[data-editor-demo-panes]").forEach(setupEditorDemoPanes);
}
