/**
 * An embed sized by the thing inside it.
 *
 * Some providers post their rendered height to the page rather than filling
 * the box they are given — HubSpot's booking widget sends `{"height":715}`
 * and its own script applies it. Reading the message directly means the box
 * is the height the provider asked for, and follows it when the content
 * changes, rather than being a number somebody guessed.
 *
 * Only a provider on this list is listened to, the message must come from
 * that provider's own origin, and the height must be a plausible number.
 */
const HEIGHT_PROVIDERS = new Set(["https://meetings.hubspot.com"]);

const MIN_HEIGHT = 160;
const MAX_HEIGHT = 3000;

function originOf(frame: HTMLIFrameElement): string {
  try {
    return new URL(frame.src).origin;
  } catch {
    return "";
  }
}

function heightFrom(data: unknown): number | null {
  let payload: unknown = data;

  if (typeof data === "string") {
    try {
      payload = JSON.parse(data);
    } catch {
      return null;
    }
  }

  const height = (payload as { height?: unknown })?.height;

  if (typeof height !== "number" || !Number.isFinite(height)) return null;
  if (height < MIN_HEIGHT || height > MAX_HEIGHT) return null;

  return height;
}

function applyHeight(event: MessageEvent): void {
  if (!HEIGHT_PROVIDERS.has(event.origin)) return;

  const height = heightFrom(event.data);

  if (height === null) return;

  document.querySelectorAll<HTMLIFrameElement>(".embed-wrapper iframe").forEach((frame) => {
    if (originOf(frame) !== event.origin) return;

    const box = frame.closest<HTMLElement>(".embed-content");

    if (!box) return;

    /* The ratio was only ever a guess at the right size; the provider knows. */
    box.style.aspectRatio = "auto";
    box.style.blockSize = `${height}px`;
  });
}

let listening = false;

export function setupEmbeds(): void {
  if (listening) return;
  listening = true;

  window.addEventListener("message", applyHeight);
}
