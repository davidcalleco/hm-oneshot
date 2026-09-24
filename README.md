# Hello Machine

The website for Hello Machine — a design-led technology studio working across
strategy, digital design, websites, automation and AI.

A single, editorially paced page: opening statement → studio positioning →
capabilities → work index → approach → point of view → contact.

This is also the reference implementation of the studio's Astro standard. New
client sites should start from the patterns here.

## Stack

| Concern    | Choice                                                                       |
| ---------- | ---------------------------------------------------------------------------- |
| Framework  | Astro 7 — `output: "static"`, no adapter                                      |
| Language   | TypeScript (`astro/tsconfigs/strict`)                                         |
| Styling    | Tailwind CSS v4 via `@tailwindcss/vite`; tokens in `src/styles/global.css`    |
| Type       | Archivo (display/text), Instrument Serif (italic accent), JetBrains Mono (labels) — self-hosted through Astro's fonts API |
| Motion     | GSAP 3 (ScrollTrigger, CustomEase) + Lenis, tokenised in `src/lib/motion.ts`  |
| Interactivity | Vanilla TS custom elements. No UI framework, no hydration runtime.         |
| Imagery    | Hand-drawn inline SVG. No stock photography, no bitmaps.                      |

**No adapter is deliberate.** The site has no server work, so it builds to
plain files and deploys anywhere — Vercel today, Webflow Cloud or Netlify
later — without changing a line of config.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static build to dist/
npm run preview  # serve the build
npm run check    # astro check — types across .astro and .ts
```

## Structure

```
astro.config.mjs        static output, sitemap, self-hosted fonts
public/                 og.png, favicon.png, robots.txt
src/
  assets/fonts/         the six woff2 subsets, served by the fonts API
  layouts/
    BaseLayout.astro    head, metadata, JSON-LD, fonts, global scripts
  pages/
    index.astro         reads content, passes it to each section
    404.astro
  components/
    ui/                 Button, Statement, SectionLabel, SectionHead, Tag,
                        Reveal, Marquee
    sections/           one file per page section, props-only
    layout/             Header, Footer
    media/Artwork.astro six conceptual SVG compositions
  scripts/              behaviour: one module per interactive piece
  data/content.ts       all copy and structured content
  lib/motion.ts         every easing curve, duration and stagger
  styles/global.css     design tokens, type scale, utilities
```

**Sections are props-only.** Nothing under `src/components/sections` imports
`src/data/content` for values — `index.astro` reads it and passes each section
its content, so the writing can be edited, restaged or moved to a CMS (or to
Webflow-authored content) without touching layout. The same discipline applies
to motion: sections never invent an easing curve or a duration, they take them
from `src/lib/motion.ts`.

## Interactivity

There is no UI framework. Each interactive piece is a **custom element** whose
behaviour lives in `src/scripts`, paired with an `.astro` component that
renders the markup:

| Element            | Behaviour                                                |
| ------------------ | -------------------------------------------------------- |
| `<hm-header>`      | condensed state, mobile panel, section tracking pill      |
| `<hm-marquee>`     | ticker driven by scroll velocity and direction            |
| `<hm-capabilities>`| expanding index with a pointer-following meta column      |
| `<hm-work-index>`  | the work browser (below)                                  |

Two behaviours are page-wide rather than component-scoped and are initialised
once from `BaseLayout`: `smooth-scroll.ts` and `reveal.ts`.

Server data reaches these scripts through `data-*` attributes, never through
serialised props — that is the Astro-idiomatic seam and it keeps the markup
readable.

## The work index

The one genuinely interactive piece. A list of six applications paired with a
single media stage.

- Pointer, keyboard and touch drive the same state. Hover selects, focus
  selects, tap selects.
- **Nothing essential lives in the stage.** Each row carries its own premise,
  summary and disciplines, so the artwork is decorative (`aria-hidden`) and the
  list is complete on its own.
- Below `lg`, the stage is dropped and the selected row renders its artwork
  inline — a tap target rather than a hover target.
- Changing selection plays a directional wipe: the incoming artwork is
  uncovered from the side the selection travelled, so the movement of the list
  and the movement of the image agree.
- The stage parallax uses `gsap.quickTo`, which retargets one live tween rather
  than starting a new one per pointer event. Bounded to a few pixels, skipped
  on coarse pointers, disabled under reduced motion.

## Fonts

Fonts are **self-hosted from `src/assets/fonts`** through Astro's fonts API,
not re-fetched from a provider. This is deliberate: the display type uses
Archivo's width axis (`font-stretch: 94%`), and a provider that ships only the
weight axis renders every headline about 5% wider. The committed files carry
the width axis, and `astro.config.mjs` declares the matching
`stretch: "62% 125%"` range.

Astro also generates a metric-matched local fallback face per family, so the
pre-swap frame does not shift the layout.

## Content honesty

The site shows **conceptual applications, not case studies**. There are no
invented clients, logos, testimonials, awards or performance figures anywhere
in it, and the work section says so in plain language. Real client work should
replace these entries only with permission.

## Accessibility

- All text meets WCAG 2.2 AA contrast, verified against rendered colours,
  including the 11px mono labels and the ghosted display numerals.
- Skip link, visible focus ring on every interactive element, `Escape` closes
  the mobile panel, and nothing behind the panel stays focusable.
- Scroll reveals are armed only by JS and only when motion is allowed. Without
  scripts, or with reduced motion, every section renders in its final state —
  and content the viewport skips past is released rather than left hidden.
- Anything that receives focus is revealed immediately, so a keyboard user is
  never moved to an element that is still transparent.
- The hero ships its entrance state as inline styles so the final frame is
  never painted first. A `<noscript>` rule and a reduced-motion rule each clear
  that state, so the hero can never be left hidden.

## Design system

See `DESIGN.md` for tokens, type scale, motion values and the rules the
composition follows.
