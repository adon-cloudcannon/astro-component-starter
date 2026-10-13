/**
 * The id of a page's billing switch, and the attribute its CSS keys off.
 *
 * There is one switch per page and more than one control for it: the plan
 * cards own the `<input>`, and the comparison table draws a second label
 * pointing at the same id, so a reader deep in the table does not have to
 * scroll back up to change it. One input under two labels is what keeps the
 * two controls in step with no script. A table on a page with no plan cards
 * has nothing to point at, so its control is inert — the section's
 * `showAnnualPricing` says as much.
 */
export const BILLING_INPUT_ID = "pricing-billing";

/** Marks the one input, so the price rules never name the id itself. */
export const BILLING_INPUT_ATTRIBUTE = "data-billing-switch";
