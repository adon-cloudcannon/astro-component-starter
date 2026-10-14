const CURRENT = "is-current";

/** The block a chip and its note share: the body of prose they both sit in. */
function scopeOf(element: Element): ParentNode {
  return element.closest(".prose") ?? document;
}

function notesFor(scope: ParentNode, number: string): HTMLElement[] {
  return [...scope.querySelectorAll<HTMLElement>(`[data-annotation="${number}"]`)].filter(
    (element) => !element.classList.contains("code-annotation")
  );
}

function chipsFor(scope: ParentNode, number: string): HTMLElement[] {
  return [...scope.querySelectorAll<HTMLElement>(`.code-annotation[data-annotation="${number}"]`)];
}

function show(chip: HTMLElement): void {
  const scope = scopeOf(chip);
  const number = chip.dataset.annotation ?? "";
  const notes = notesFor(scope, number);

  scope
    .querySelectorAll(`.${CURRENT}`)
    .forEach((element) => element.classList.remove(CURRENT));

  if (!notes.length) return;

  chipsFor(scope, number).forEach((element) => element.classList.add(CURRENT));
  notes.forEach((note) => note.classList.add(CURRENT));

  /* Only travel when the note is off screen: a note already in view beside the
     code should not be yanked around under the reader. */
  const box = notes[0].getBoundingClientRect();

  if (box.top < 0 || box.bottom > window.innerHeight) {
    notes[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export function setupCodeAnnotations(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>(".code-annotation").forEach((chip) => {
    if (chip.dataset.annotationReady === "true") return;
    chip.dataset.annotationReady = "true";

    const number = chip.dataset.annotation ?? "";

    /* A chip whose note never came across is decoration, not a control. */
    if (!notesFor(scopeOf(chip), number).length) {
      chip.setAttribute("tabindex", "-1");
      chip.setAttribute("aria-hidden", "true");
      chip.dataset.annotationOrphan = "true";

      return;
    }

    chip.addEventListener("click", () => show(chip));
  });

  /* The other direction: resting on a note lights up the lines it answers. */
  root.querySelectorAll<HTMLElement>("[data-annotation]").forEach((note) => {
    if (note.classList.contains("code-annotation") || note.dataset.annotationReady === "true") {
      return;
    }
    note.dataset.annotationReady = "true";

    const number = note.dataset.annotation ?? "";
    const mark = (on: boolean) =>
      chipsFor(scopeOf(note), number).forEach((chip) => chip.classList.toggle("is-peer", on));

    note.addEventListener("pointerenter", () => mark(true));
    note.addEventListener("pointerleave", () => mark(false));
  });
}
