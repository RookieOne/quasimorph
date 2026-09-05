# 007 — Verified class and perk browser

**Status:** Implemented
**Last updated:** 2026-09-05

## Problem

The application contains a verified Quasimorph 1.0.3 inventory of classes and
class perks, but the interface still displays synthetic placeholder records.
Players need a trustworthy way to browse the extracted inventory before perk
parameters are promoted to calculation rules.

This slice connects the verified catalog to the existing calculator shell while
preserving the distinction between verified source data and unverified gameplay
semantics.

## User story

As a Quasimorph player, I want to select a real class and inspect its ordered
perks and levels so that I can reference the supported 1.0.3 game data without
mistaking raw configuration parameters for calculated effects.

## Scope

- Replace the synthetic class preview with the verified 1.0.3 catalog.
- Provide a searchable class-selection dialog containing all 14 classes.
- Show the selected class's six perks in source order.
- Let the user inspect each perk's type, leveling configuration, restrictions,
  four grades, experience thresholds, and source-native parameters.
- Show verified catalog coverage, public game version, and internal build ID.
- Clearly distinguish verified inventory fields from unresolved parameter
  semantics and synthetic calculated-output values.
- Keep selection state in memory for the current page session.

## Out of scope

- Interpreting source parameters as calculator modifiers or formulas
- Replacing source parameter IDs with guessed player-facing descriptions
- Calculating attributes, resistances, damage, cooldowns, or activation chances
- Selecting perk replacements or changing the six perks assigned to a class
- Class unlock/start-state claims not represented by the verified catalog
- Operative, equipment, build persistence, import/export, or URL state
- Activating the separate Database navigation destination
- Additional localization beyond the extracted English names

## Behavior

### Initial state

- The first source-ordered class, Scouts of Hades, is selected on initial load.
- The class selection card, deployment profile, and perk list all reflect the
  same selected class.
- No selection is written to browser storage or the URL.

### Class selection

- Activating the class selection card opens a modal dialog.
- The dialog lists all 14 classes in source order and identifies the currently
  selected class.
- A text field filters classes by English display name, case-insensitively.
- A query with no matches shows an explicit empty state and leaves the current
  selection unchanged.
- Selecting a class closes the dialog and updates all class-dependent content.
- Escape closes the dialog without changing the selection, and focus returns to
  the class selection card.

### Perk presentation

- The selected class displays exactly six numbered perk rows in source order.
- Each row shows the English name and whether the perk is passive or triggered.
- A perk row can be expanded independently to show:
  - its source ID;
  - leveling action and experience gained per qualifying action;
  - weapon class and subclass restrictions, or `None` when empty; and
  - basic, advanced, master, and legend levels in order.
- Each level shows the experience required for the next level. Legend is labeled
  as the maximum level rather than displaying a missing threshold.
- Each level lists raw parameter ID/value pairs without changing units, signs,
  or numeric precision. Boolean values are displayed as `true` or `false`.
- Expanding a perk does not imply that its parameters are active in the preview
  calculations.

### Evidence and confidence

- The coverage notice identifies the catalog as verified game configuration for
  public version 1.0.3 and build `1.0.3.578s.024ad60`.
- The notice reports 14 included classes and 79 included class perks from the
  validated manifest rather than hard-coded UI totals.
- A nearby explanation states that parameter meanings and calculation behavior
  remain unresolved.
- The UI must not describe raw parameter values as bonuses, penalties,
  percentages, durations, chances, or final effects unless later evidence
  verifies that interpretation.

### Existing preview output

- The operative, equipment, attributes, resistances, and validation content
  remain synthetic interface previews in this slice.
- That region is labeled clearly enough that changing classes cannot be read as
  recalculating or verifying those values.
- Selecting a class does not change any synthetic attribute or resistance value.

## Game-data dependencies

- Dataset: `qm-1-0-3-class-perk-catalog`
- Public version: 1.0.3
- Internal build: `1.0.3.578s.024ad60`
- Source: embedded `config_mercenaries` and English `localization` records
- Inventory confidence: verified
- Parameter meaning and calculation confidence: unknown

The UI consumes the runtime-validated `classPerkCatalog`; it must not import the
synthetic `class-perk-placeholder` dataset for class or perk presentation.

## Acceptance criteria

- Given the initial page, the verified coverage notice reports version 1.0.3,
  build `1.0.3.578s.024ad60`, 14 classes, and 79 perks.
- Given the initial page, Scouts of Hades and its six source-ordered perks are
  shown without placeholder class or perk names.
- Given the class dialog, entering `angel` leaves Angels of Spades as a match.
- Given a class result, selecting it updates the class card, deployment profile,
  and six displayed perk rows without reloading the page.
- Given a query with no matches, the dialog shows an empty state and preserves
  the current class.
- Given a perk row, expanding it exposes all four ordered levels, progression
  thresholds, restrictions, and exact raw parameter values from the catalog.
- Given a legend level, the UI identifies it as maximum level and does not render
  a fabricated experience threshold.
- Given empty weapon restrictions, the UI displays `None` rather than implying
  unrestricted behavior with a blank value.
- Given the reference and result regions, verified source data and synthetic
  preview calculations are visibly and textually distinguished.
- Given keyboard-only interaction, users can open, search, select, expand,
  dismiss, and return focus from the dialog.
- Given a 320 CSS-pixel viewport, class selection and perk inspection remain
  usable without horizontal page scrolling.

## Verification

- Unit-test the class-name filtering function, including case-insensitive and
  no-match queries.
- Component-test initial selection, selection updates, empty search results,
  dialog dismissal, and focus restoration.
- Component-test the complete perk detail fields and legend-level presentation.
- Assert coverage and build metadata are read from the validated manifest.
- Assert synthetic placeholder class/perk names no longer appear in the UI.
- Run formatting, lint, type checking, unit/component tests, production build,
  and GitHub Pages base-path build.
- Manually verify dialog focus, reduced-width layout at 320 CSS pixels, and
  readable expanded perk details on desktop and mobile widths.

## Open questions

- Should multiple perk rows remain open simultaneously? Default for this slice:
  yes, because side-by-side level inspection is useful and does not imply state.
- Should raw parameter IDs receive a human-readable glossary? Deferred until
  parameter semantics are verified.
