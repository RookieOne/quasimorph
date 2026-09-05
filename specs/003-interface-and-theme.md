# 003 — Interface and Tailwind theme

**Status:** Accepted  
**Last updated:** 2026-09-05

## Experience direction

The application should resemble a severe industrial planning terminal: dense
enough for meaningful comparison, but clearer and more accessible than a direct
reproduction of the game interface.

The visual language is inspired by Quasimorph without copying proprietary art,
icons, typography, or screen layouts.

## Application structure

Primary destinations:

- **Builds** — saved and example builds
- **Calculator** — the main build editor
- **Database** — searchable reference data after the MVP
- **Compare** — side-by-side comparison after the MVP
- **About** — coverage, supported game version, sources, and disclaimer

## Calculator layout

Large screens use three functional regions:

1. selection and navigation
2. current character and loadout
3. calculated totals, breakdowns, and validation

On narrower screens, regions become a single reading flow. Important totals and
validation status remain available through a compact sticky summary. The UI
must not depend on hover for essential information.

## Tailwind theme

Tailwind is used as the styling foundation, with semantic project tokens instead
of scattered arbitrary colors. The initial token families are:

- `canvas` — near-black application background
- `surface` — layered charcoal panels
- `ink` — warm white primary text and muted secondary text
- `signal` — rust red or hazard orange for primary actions and emphasis
- `positive` — restrained acid green for valid or improved states
- `warning` — amber for uncertain or incomplete calculations
- `danger` — red for invalid selections and destructive actions
- `line` — quiet borders and stronger selected-state borders

Components should consume semantic tokens such as `bg-surface-raised` and
`text-ink-muted`, allowing the exact palette to change without component edits.

## Typography and shape

- A condensed display face may be used for major headings and numerical labels.
- Body text and control labels use a highly legible sans-serif face.
- Panels favor clipped or angular details, thin borders, and modest radii.
- Uppercase technical labels are acceptable at small sizes when letter spacing
  and contrast preserve readability.
- Textures, scan lines, glows, and animation remain subtle and respect reduced
  motion preferences.

## Component language

The first reusable components should include:

- application shell and navigation
- panel and section heading
- selection card
- searchable selection dialog
- equipment slot
- statistic row and calculation breakdown
- validation banner and issue list
- status badge
- confirmation dialog
- empty state

## Accessibility requirements

- Meet WCAG 2.2 AA contrast targets for functional text and controls.
- All controls expose accessible names and visible focus states.
- Color never communicates validity or stat direction by itself.
- Interactive targets are comfortably operable by touch.
- Motion is reduced when requested by the operating system.
- Dense stat layouts retain meaningful reading and focus order.
