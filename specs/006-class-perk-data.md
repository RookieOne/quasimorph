# 006 — Class and perk data foundation

**Status:** Implemented

**Last updated:** 2026-09-05

## Problem

The calculator needs trustworthy, versioned descriptions of classes and perks
before it can model class progression or calculate perk effects. Existing web
references may predate the supported game release and cannot silently become
authoritative data.

## Support baseline

The first dataset targets the stable Quasimorph 1.0.3 release from 2026-08-21.
See [`research/class-perk-sources.md`](./research/class-perk-sources.md) for the
version evidence, source hierarchy, and unresolved verification work.

## Scope

- Define a runtime-validated dataset manifest.
- Define class and perk records with stable internal IDs.
- Reference perks from ordered class slots.
- Represent passive and triggered perk behavior.
- Represent explicit perk levels and their effects without interpolating values.
- Record activation, leveling, prerequisites, applicability, and multiple effects.
- Attach field-level or record-level source evidence and confidence.
- Add a deliberately small synthetic placeholder dataset to exercise every
  supported record shape.
- Expose dataset version and coverage through the application shell.

## Out of scope

- Operatives and personal perks
- Weapons, armor, inventory, and equipment slots
- Applying effects to calculated character totals
- Verified class/perk content until extraction is available in a separate PR
- Modeling unlock inventory or save-game state
- Localized UI beyond the source English strings

## Proposed records

### Dataset manifest

- schema version
- dataset ID
- supported public game version
- internal game build ID, when available
- language
- capture date
- content coverage counts
- source references

### Class

- stable ID
- display name and description
- starting/unlock classification
- ordered perk slots referencing perk IDs
- source evidence

### Perk

- stable ID
- display name and description
- passive or triggered kind
- explicit levels
- activation definition, when triggered
- leveling action and experience amount
- applicability constraints
- source evidence

### Perk level

- level number
- one or more typed effects
- duration, radius, count, or other effect parameters when applicable

### Evidence

- source type
- source locator
- observed game version/build
- capture or verification date
- confidence: verified, documented, inferred, or unknown
- optional note

## Data integrity rules

- IDs are unique and non-empty.
- Every class perk reference resolves to a known perk.
- Class slot order is explicit and stable.
- Perk levels are positive, unique, and ordered.
- Triggered perks have an activation definition.
- Passive perks do not invent an activation definition.
- Effects use known typed operations and parameters.
- Unknown behavior is preserved as an explicit unresolved field or note, not
  converted into a guessed modifier.
- Every gameplay value has source evidence.
- Dataset coverage counts match the actual records.

## Acceptance criteria

- Runtime validation accepts the verified fixture dataset.
- Validation rejects duplicate IDs and unresolved class-to-perk references.
- Validation rejects malformed perk levels, effects, and evidence.
- Tests cover passive perks, triggered perks, multi-effect levels, conditional
  applicability, and unknown behavior.
- The UI reads public version and coverage from the validated manifest.
- The UI never labels documented or inferred values as verified.
- Placeholder records are unmistakably labeled synthetic in data and UI.
- No placeholder record can claim verified evidence.

## Blocking research

Replacing placeholder records with stable 1.0.3 data is intentionally deferred
to a separate PR. That work requires stable game records or complete in-game
screens and must retain provenance for every gameplay value.
