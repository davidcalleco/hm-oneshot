// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/**
 * Static output, no adapter.
 *
 * The site has no server work of any kind, so it builds to plain files. That
 * also keeps it portable: the same codebase deploys to Vercel, Netlify or
 * Webflow Cloud without changing anything here.
 */

const site = process.env.SITE_URL ?? "https://hm-2026.vercel.app";

/**
 * Unicode ranges, lifted verbatim from the subsets Google serves so the
 * browser only fetches the block it actually needs.
 */
/** @type {[string, ...string[]]} */
const LATIN = [
  "U+0-FF", "U+131", "U+152-153", "U+2BB-2BC", "U+2C6", "U+2DA", "U+2DC",
  "U+304", "U+308", "U+329", "U+2000-206F", "U+20AC", "U+2122", "U+2191",
  "U+2193", "U+2212", "U+2215", "U+FEFF", "U+FFFD",
];
/** @type {[string, ...string[]]} */
const LATIN_EXT = [
  "U+100-2BA", "U+2BD-2C5", "U+2C7-2CC", "U+2CE-2D7", "U+2DD-2FF", "U+304",
  "U+308", "U+329", "U+1D00-1DBF", "U+1E00-1E9F", "U+1EF2-1EFF", "U+2020",
  "U+20A0-20AB", "U+20AD-20C0", "U+2113", "U+2C60-2C7F", "U+A720-A7FF",
];

export default defineConfig({
  site,
  output: "static",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },

  /**
   * Fonts are self-hosted from `src/assets/fonts` rather than re-fetched from
   * a provider. Archivo is used across a width range (`font-stretch: 94%` on
   * display type), and a provider that ships only the weight axis would render
   * every headline ~5% wider. These are the exact files, so the width axis is
   * guaranteed present.
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Archivo",
      cssVariable: "--font-archivo",
      fallbacks: ["Helvetica Neue", "Arial", "sans-serif"],
      display: "swap",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/archivo-latin.woff2"],
            weight: "100 900",
            style: "normal",
            stretch: "62% 125%",
            unicodeRange: LATIN,
          },
          {
            src: ["./src/assets/fonts/archivo-latin-ext.woff2"],
            weight: "100 900",
            style: "normal",
            stretch: "62% 125%",
            unicodeRange: LATIN_EXT,
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      fallbacks: ["Georgia", "Times New Roman", "serif"],
      display: "swap",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/instrument-serif-italic-latin.woff2"],
            weight: "400",
            style: "italic",
            unicodeRange: LATIN,
          },
          {
            src: ["./src/assets/fonts/instrument-serif-italic-latin-ext.woff2"],
            weight: "400",
            style: "italic",
            unicodeRange: LATIN_EXT,
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      fallbacks: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
      display: "swap",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/jetbrains-mono-latin.woff2"],
            weight: "400 500",
            style: "normal",
            unicodeRange: LATIN,
          },
          {
            src: ["./src/assets/fonts/jetbrains-mono-latin-ext.woff2"],
            weight: "400 500",
            style: "normal",
            unicodeRange: LATIN_EXT,
          },
        ],
      },
    },
  ],
});
