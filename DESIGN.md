# Hello Machine — design system

The site is white-first and typographic. Colour marks state; it never carries
the identity. Character comes from the type pairing and the composition.

## The idea

**Editorial voice, machine annotation.** Large grotesk statements carry the
argument; mono micro-labels annotate them like a spec sheet; a single serif
italic word lands inside each big statement as the human note. That tension —
warm statement, precise annotation — is the studio's name made visual.

## Colour

Declared in `app/globals.css` under `@theme`.

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

Three families, each with one job.

- **Archivo** (variable, `wdth` axis) — display and text. Statements run at
  `font-stretch: 94–96%` with `-0.03em` tracking and sub-1 line height.
- **Instrument Serif**, italic only — the single emphasised word inside a
  statement. Never a whole sentence.
- **JetBrains Mono** — all micro-labels: section numbers, category tags, meta
  rows. Always uppercase, `0.13em` tracking, 11px.

Scale utilities: `type-display`, `type-statement`, `type-heading`, `type-lede`,
`type-body`, `type-label`, `type-serif`. All fluid via `clamp()`. Use the
utility; do not set ad-hoc sizes.

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

One system, all hand-written.

- `hm-rise` — the hero's staggered entrance, 0.9s expo, ≤220ms of stagger.
- `Reveal` — a shared IntersectionObserver that arms elements only after JS
  loads. The un-animated page is the real page.
- `hm-marquee` — the capability ticker; pauses on hover and focus.
- Interaction transitions use `cubic-bezier(0.16, 1, 0.3, 1)` at 300–900ms.

`prefers-reduced-motion: reduce` disables all of it, including smooth scroll,
and leaves every section in its final state.

## Anti-patterns

Do not add: SaaS feature cards, three equal columns under a centred hero, dark
purple AI gradients, glassmorphism, decorative icon boxes, cursor trails, 3D
without a reason, invented statistics, stock photography, or animation that
delays access to content.
