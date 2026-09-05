# 001 — MVP calculator

**Status:** Draft  
**Last updated:** 2026-09-05

## User story

As a Quasimorph player, I want to assemble a character build and see its
calculated effects so that I can evaluate the build before using it in game.

## MVP scope

The first vertical slice includes:

- Create, rename, duplicate, and delete a build.
- Select one character and one compatible class.
- Select the supported perk or progression choices represented in the initial
  dataset.
- Equip supported weapons, armor, and carried items in valid slots.
- Display base values, modifiers, totals, and warnings.
- Show a breakdown for each calculated total.
- Save builds in browser storage.
- Export and import a versioned build document as JSON.
- Provide one example build for exploration.

The initial dataset may intentionally cover only enough content to validate the
model and interaction design. Dataset coverage must be disclosed in the UI.

## Calculator behavior

1. A result is derived from immutable game data, user selections, and explicit
   calculation rules.
2. Every modifier records its source and operation.
3. Results are recomputed from inputs; calculated totals are never persisted as
   authoritative build data.
4. An unsupported or unknown interaction produces a visible warning rather
   than an invented result.
5. Importing an older build runs through a versioned migration before use.

## Validation behavior

Validation messages have three levels:

- **error** — the build cannot be evaluated reliably
- **warning** — evaluation is possible, but a choice may be invalid or incomplete
- **notice** — useful context that does not affect validity

The user must never lose a choice merely because it becomes invalid. Invalid
choices remain visible until the user replaces or removes them.

## Acceptance criteria

- Given a new build, selecting a character and class updates all dependent
  totals without a page reload.
- Given a calculated total, opening its breakdown lists its base value and each
  contributing modifier.
- Given an incompatible selection, the interface identifies the conflicting
  choices and suggests the required corrective action.
- Given a saved build, refreshing the page restores the same user inputs.
- Given a valid exported build, importing it reconstructs equivalent inputs and
  recalculates its results.
- Given malformed or unsupported imported data, the application rejects it with
  an actionable message and does not overwrite existing builds.
- Calculation tests cover modifier order, rounding behavior, conflicting
  modifiers, and missing data for every implemented rule category.
- Keyboard-only users can reach and operate all builder controls.
- The builder remains usable at a viewport width of 320 CSS pixels.

## Open game-data questions

These must be researched before the corresponding calculation is accepted:

- Which game version will be the initial supported baseline?
- What are the exact modifier ordering and rounding rules?
- Which character/class restrictions are enforced by the game?
- Which equipment stats are intrinsic versus context-dependent?
- How should conditional perks be represented and activated in a planned build?
- Which statistics are valuable to calculate rather than merely display?

