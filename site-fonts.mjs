/**
 * Site font registration — single place to change families, weights, or provider.
 *
 * - Used by `astro.config.mjs` (`fonts`) and layout `<SiteFonts />` (preload / Font component).
 * - `cssVariable` values must match tokens consumed in CSS (`--font-body`, `--font-headings`).
 * - Prefer `fontProviders.fontsource()` (local via @fontsource packages) over remote providers.
 * - Use a weight range string (e.g. `"100 900"`) for variable fonts instead of discrete weights.
 *
 * @see https://docs.astro.build/en/guides/fonts/
 */
import { fontProviders } from "astro/config";

export const siteFonts = [
  {
    name: "Red Hat Display",
    cssVariable: "--font-body",
    provider: fontProviders.fontsource(),
    weights: ["100 900"],
    styles: ["normal"],
    subsets: ["latin"],
  },
  {
    name: "Red Hat Display",
    cssVariable: "--font-headings",
    provider: fontProviders.fontsource(),
    weights: ["100 900"],
    styles: ["normal"],
    subsets: ["latin"],
  },
  {
    // Fragment Mono carries the eyebrow and the smaller subtitles. It is not a
    // variable font, and the design system only uses its regular weight.
    name: "Fragment Mono",
    cssVariable: "--font-mono",
    provider: fontProviders.fontsource(),
    weights: ["400"],
    styles: ["normal"],
    subsets: ["latin"],
  },
];
