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
| Motion     | GSAP 3 (ScrollTrigger, CustomEase) + Lenis smooth scroll, all tokenised in `lib/motion.ts` |
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
  layout.tsx            fonts, metadata, skip link, no-JS fallback
  page.tsx              reads content, passes it to each section, JSON-LD
  globals.css           design tokens, type scale, utilities
  opengraph-image.tsx   generated social card
  icon.tsx robots.ts sitemap.ts not-found.tsx
components/
  ui/                   primitives — Button, Statement, SectionLabel,
                        SectionHead, Tag, Collapse, Marquee
  sections/             one file per page section, props-only
  layout/               SiteHeader, SiteFooter
  motion/               Reveal, SmoothScroll
  media/                artwork.tsx — six conceptual SVG compositions
lib/
  content.ts            all copy and structured content
  motion.ts             every easing curve, duration and stagger
```

**Sections are props-only.** Nothing under `components/sections` imports
`lib/content` for values — `app/page.tsx` reads it and passes each section its
content, so the writing can be edited, restaged or moved to a CMS without
touching layout. The same applies to motion: sections never invent an easing
curve or a duration, they take them from `lib/motion.ts`.

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
  than starting a new one per pointer event — that is what makes it feel
  weighted instead of twitchy. Bounded to a few pixels, skipped on coarse
  pointers, and disabled under `prefers-reduced-motion`.

## Content honesty

The site shows **conceptual applications, not case studies**. There are no
invented clients, logos, testimonials, awards or performance figures anywhere
in it, and the work section says so in plain language. Real client work should
replace these entries only with permission.

## Motion

One system, declared in `lib/motion.ts`: three named `CustomEase` curves, four
durations, three staggers. Nothing else in the codebase writes a raw easing
string or duration.

- **Smooth scroll** is Lenis, running on GSAP's ticker so scroll position and
  ScrollTrigger never drift apart. Lenis rather than GSAP's own ScrollSmoother,
  because ScrollSmoother transforms a wrapper element and that breaks
  `position: sticky` — which the work index stage depends on.
- **In-page links** are intercepted so the URL still updates. Header clearance
  comes from each section's own `scroll-mt-28`, which Lenis honours and which
  the browser uses when JS is unavailable — there is no second offset in JS to
  keep in sync.
- **Reduced motion** disables Lenis entirely, and every GSAP animation is
  registered through `gsap.matchMedia()` so it is never created at all.

## Accessibility

- All text meets WCAG 2.2 AA contrast (verified against rendered colours,
  including the 11px mono labels and the ghosted display numerals).
- Skip link, visible focus ring on every interactive element, `Escape` closes
  the mobile panel, and nothing behind the panel stays focusable.
- Scroll reveals are armed only by JS and only when motion is allowed. Without
  scripts, or with reduced motion, every section renders in its final state —
  and content the viewport skips past is released rather than left hidden.
- Anything that receives focus is revealed immediately, so a keyboard user is
  never moved to an element that is still transparent.
- The hero ships its entrance state as inline styles so the final frame is
  never painted first. A `<noscript>` rule and a reduced-motion rule each clear
  that state, so the hero is never left hidden.
- No information is conveyed by hover alone.

## Design system

See `DESIGN.md` for the tokens, type scale, and the rules the composition
follows.
