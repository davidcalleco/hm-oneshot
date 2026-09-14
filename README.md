# Hello Machine

The website for Hello Machine — a design-led technology studio working across
strategy, digital design, websites, automation and AI.

A single, editorially paced page: opening statement → studio positioning →
capabilities → work index → approach → point of view → contact.

## Stack

| Concern    | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, Turbopack)               |
| Language   | TypeScript                                                 |
| Styling    | Tailwind CSS v4, tokens declared in `app/globals.css`      |
| Type       | Archivo (display/text), Instrument Serif (italic accent), JetBrains Mono (labels) — self-hosted via `next/font` |
| Motion     | Hand-written CSS transitions + IntersectionObserver. No animation library. |
| Imagery    | Hand-drawn inline SVG. No stock photography, no bitmaps.   |

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npx eslint .    # lint
```

## Structure

```
app/
  layout.tsx            fonts, metadata, skip link
  page.tsx              section composition + JSON-LD
  globals.css           design tokens, type scale, utilities, keyframes
  opengraph-image.tsx   generated social card
  robots.ts sitemap.ts not-found.tsx
components/
  site-header.tsx       floating wordmark / nav / CTA, mobile panel
  hero.tsx              opening statement, orientation strip, capability ticker
  studio.tsx            positioning, and the four fields the studio spans
  capabilities-list.tsx nine capabilities as an expanding index
  work-index.tsx        the work browser (see below)
  artwork.tsx           six conceptual SVG compositions
  approach.tsx          the four-move process
  point-of-view.tsx     inverted section — what the studio believes
  contact.tsx           closing invitation and what happens next
  site-footer.tsx
  reveal.tsx            shared scroll-reveal primitive
lib/content.ts          all copy and structured content
```

All copy lives in `lib/content.ts`. Sections take their content from there and
hold no strings of their own beyond section furniture, so the writing can be
edited without touching layout.

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
- The stage parallax is bounded to a few pixels, skipped on coarse pointers,
  and disabled under `prefers-reduced-motion`.

## Content honesty

The site shows **conceptual applications, not case studies**. There are no
invented clients, logos, testimonials, awards or performance figures anywhere
in it, and the work section says so in plain language. Real client work should
replace these entries only with permission.

## Accessibility

- All text meets WCAG 2.2 AA contrast (verified against rendered colours,
  including the 11px mono labels and the ghosted display numerals).
- Skip link, visible focus ring on every interactive element, `Escape` closes
  the mobile panel, and nothing behind the panel stays focusable.
- Scroll reveals are armed only by JS and only when motion is allowed. Without
  scripts, or with reduced motion, every section renders in its final state —
  and content the viewport skips past is released rather than left hidden.
- No information is conveyed by hover alone.

## Design system

See `DESIGN.md` for the tokens, type scale, and the rules the composition
follows.
