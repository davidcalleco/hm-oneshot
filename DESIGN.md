# Hello Machine — design system

The site is white-first and typographic. Colour marks state; it never carries
the identity. Character comes from the type pairing and the composition.

## The idea

**Editorial voice, machine annotation.** Large grotesk statements carry the
argument; mono micro-labels annotate them like a spec sheet; a single serif
italic word lands inside each big statement as the human note. That tension —
warm statement, precise annotation — is the studio's name made visual.

## Colour

Declared in `src/styles/global.css` under `@theme`.

| Token                 | Value     | Role                                        |
| --------------------- | --------- | ------------------------------------------- |
| `--color-paper`       | `#faf9f6` | Default canvas — warm, not clinical white   |
| `--color-surface`     | `#ffffff` | Lifted sections (capabilities, footer)      |
| `--color-cream`       | `#f0ece2` | Tonal break (ticker, approach)              |
| `--color-ink`         | `#0e0f11` | Type, and the one inverted section          |
| `--color-body`        | `#34373c` | Body copy                                   |
| `--color-faint`       | `#66696f` | Mono labels on light                        |
| `--color-faint-invert`| `#9a9da4` | Mono labels on ink                          |
| `--color-numeral`     | `#86847c` | Ghosted display numerals                    |
| `--color-line`        | `#e3e0d8` | Hairlines                                   |
| `--color-signal`      | `#1d3bf0` | **The only accent.** State, not decoration. |

`--color-signal` appears as: the pulse beside the wordmark, the italic accent
word, active rows in the work index, the primary CTA, focus rings, and the
active tick in the studio band. It is never used as a gradient, and never as
large fill except on the one project artwork that is deliberately tonal.

Every text/background pair in the built page was measured against WCAG 2.2 AA
(4.5:1 body, 3:1 large). Keep it that way when adding colours.

## Type

Three families, each with one job. All three are self-hosted from
`src/assets/fonts` through Astro's fonts API — see the Fonts note in README.md
for why they are committed rather than fetched.

- **Archivo** (variable, `wdth` axis) — display and text. Statements run at
  `font-stretch: 94–96%` with `-0.03em` tracking and sub-1 line height.
- **Instrument Serif**, italic only — the single emphasised word inside a
  statement. Never a whole sentence.
- **JetBrains Mono** — all micro-labels: section numbers, category tags, meta
  rows. Always uppercase, `0.13em` tracking, 11px.

Scale utilities: `type-display`, `type-statement`, `type-heading`, `type-lede`,
`type-body`, `type-label`, `type-serif`. All fluid via `clamp()`. Use the
utility; do not set ad-hoc sizes.

**`ch`-based measures are font-dependent.** Several headings cap their measure
in `ch`, which resolves against the rendered font — so a font change moves every
line break. The hero caps at `20ch` because its longest authored line measures
19.31ch in Archivo and its three line breaks are deliberate. If the display face
ever changes, re-measure that cap.

## Layout

- `shell` — max `96rem`, fluid gutter `clamp(1.25rem, 4vw, 3.5rem)`.
- `grid-editorial` — 12 columns. Sections deliberately vary which columns they
  occupy; the meta label sits in columns 1–4 and the argument in 5–12, but the
  work index inverts to stage-left / index-right and the hero runs full bleed.
- The hero draws faint column guides — a drafting detail that states the grid
  everything else is built on.

## Rhythm

Sections alternate tone so no two neighbours read the same: paper hero → cream
ticker → paper studio → white capabilities → paper work → cream approach → ink
point of view → paper contact → white footer.

## Motion

One system, declared in `src/lib/motion.ts` and used by everything. Sections do
not invent curves or durations.

**Curves** (registered as GSAP `CustomEase`, mirroring the CSS variables):
`hm-out` `0.16, 1, 0.3, 1` — the default, for anything entering.
`hm-in-out` `0.83, 0, 0.17, 1` — for things that travel, like the stage wipe.
`hm-soft` `0.33, 1, 0.68, 1` — for ambient corrections, like ticker velocity.

**Durations**: `fast` 0.32s, `base` 0.6s, `slow` 0.9s, `reveal` 1.05s,
`stage` 1.15s. **Staggers**: `tight` 0.055s, `base` 0.085s, `loose` 0.12s.

**Where motion is used**

- *Hero* — a line-mask entrance: each headline line rises out of its own
  overflow-hidden wrapper, staggered, with the rule drawing first.
- *Smooth scroll* — Lenis on its own rAF loop, with ScrollTrigger kept in step
  through Lenis's scroll event. Not GSAP's ticker: Astro bundles each
  component's script separately, and the coupling is not guaranteed to hold.
- *Reveal* — one shared scroll-triggered fade-and-rise, starting at `top 88%`.
- *Work stage* — a directional clip-path wipe plus a damped `quickTo` parallax
  and a slow scrub drift while the stage is pinned.
- *Marquee* — a GSAP loop that takes its speed and direction from scroll
  velocity, and pauses on hover and focus.
- *Nav* — a pill that slides to the section you are reading.
- *Collapse* — tweened height, so a mid-flight toggle is picked up rather than
  snapping.

**Rules**

- Nothing essential is gated behind an animation. The un-animated page is the
  real page.
- `prefers-reduced-motion: reduce` disables all of it — Lenis does not start,
  and GSAP animations are registered through `gsap.matchMedia()` so they are
  never created.
- Parallax stays under ~20px and never responds to a coarse pointer.
- GSAP's ticker sleeps while the document is hidden, so animations started on a
  background tab resume rather than run. Never gate content on an animation
  having completed.

## Anti-patterns

Do not add: SaaS feature cards, three equal columns under a centred hero, dark
purple AI gradients, glassmorphism, decorative icon boxes, cursor trails, 3D
without a reason, invented statistics, stock photography, or animation that
delays access to content.
