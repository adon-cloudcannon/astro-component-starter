/**
 * A screenshot of the running dev server, taken headlessly.
 *
 * The Browser pane cannot do this reliably: it only composites frames while
 * it is displayed, so a hidden pane returns blank cream rather than erroring,
 * and emulating a viewport much wider than the pane fails to paint once the
 * page is scrolled. Both failures look like a correct screenshot of a blank
 * page, which is the worst shape a failure can take — see "Done means looked
 * at" in CLAUDE.md.
 *
 * This drives the Chrome already on the machine through playwright-core,
 * which the repo already depends on. Nothing has to be visible, nothing has
 * to stay open, and 1280 is a real 1280.
 *
 * Usage:
 *   npm run shot -- <url> <out.png> [width] [height] [selector]
 *
 * With a selector the page is scrolled until that element is in view first,
 * which is how you photograph a band halfway down a long page.
 */
import { chromium } from "playwright-core";

const [url, out, width = "1280", height = "900", selector, evaluate] = process.argv.slice(2);

if (!url || !out) {
  console.error("usage: npm run shot -- <url> <out.png> [width] [height] [selector]");
  process.exit(1);
}

const browser = await chromium.launch({ channel: "chrome" });

try {
  const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
  await page.goto(url, { waitUntil: "networkidle" });

  if (selector) {
    await page.locator(selector).first().scrollIntoViewIfNeeded();
    /* Astro transcodes each image on its first request, so a fresh server
       serves a page whose pictures are still being made. */
    await page.waitForTimeout(600);
  }

  /* An optional snippet run in the page before the shot, for isolating what
     is painting something: hide a layer, toggle a class, force a state. */
  if (evaluate) {
    await page.evaluate(evaluate);
    await page.waitForTimeout(300);
  }

  await page.screenshot({ path: out });
  console.log(`shot: ${out} at ${width}x${height}${selector ? ` on ${selector}` : ""}`);
} finally {
  await browser.close();
}
