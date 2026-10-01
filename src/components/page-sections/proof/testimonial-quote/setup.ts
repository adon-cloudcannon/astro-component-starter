/**
 * The carousel variant of TestimonialQuote.
 *
 * One card, several quotes, one visible at a time. The controls live on the
 * card rather than in a slide, because the slides swap and the controls do
 * not, so there is one listener per card however many quotes it holds.
 *
 * `hidden` does the hiding, with a rule behind it: the attribute is only a
 * default `display: none` and loses to any `display` a rule sets, and the
 * slides in the splits are grids.
 */
type Carousel = HTMLElement & { __testimonialQuoteBound?: boolean };

const show = (card: HTMLElement, next: number) => {
  const slides = [...card.querySelectorAll<HTMLElement>(".testimonial-quote-slide")];
  if (!slides.length) return;

  // Wraps both ways, so the arrows never dead-end.
  const index = (next + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.hidden = i !== index;
    slide.toggleAttribute("data-active", i === index);
  });

  card.querySelectorAll<HTMLElement>(".testimonial-quote-dot").forEach((dot, i) => {
    dot.setAttribute("aria-selected", i === index ? "true" : "false");
  });

  // The accent belongs to the quote, not to the card, so the dots and the
  // arrows have to be told which one is showing.
  const accent = slides[index].style.getPropertyValue("--testimonial-quote-accent");
  card.style.setProperty("--testimonial-quote-accent", accent);
};

const current = (card: HTMLElement) => {
  const slides = [...card.querySelectorAll<HTMLElement>(".testimonial-quote-slide")];
  const found = slides.findIndex((slide) => slide.hasAttribute("data-active"));
  return found === -1 ? 0 : found;
};

export const setupTestimonialQuote = (card: Carousel) => {
  if (card.__testimonialQuoteBound) return;
  card.__testimonialQuoteBound = true;

  card.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-goto], [data-step]");
    if (!target || !card.contains(target)) return;

    const goto = target.dataset.goto;
    if (goto !== undefined) {
      show(card, Number(goto));
      return;
    }

    show(card, current(card) + Number(target.dataset.step || 1));
  });

  show(card, current(card));
};

export const setupAllTestimonialQuotes = () => {
  document
    .querySelectorAll<Carousel>('.testimonial-quote-card[data-layout="carousel"]')
    .forEach(setupTestimonialQuote);
};
