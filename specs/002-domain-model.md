# 002 — Domain model

**Status:** Draft  
**Last updated:** 2026-09-05

## Design principles

- Stable identifiers are used instead of display names as references.
- Game data is immutable at runtime.
- User-authored build data contains selections, not copied game entities.
- Calculated results are derived and disposable.
- Every persisted document carries a schema version.
- Game release compatibility is recorded independently from schema version.

## Core concepts

### Dataset

A versioned collection of characters, classes, perks, equipment, slots,
statistics, compatibility constraints, and calculation rules for one supported
game release.

Required metadata:

- dataset identifier and schema version
- supported game version
- publication date
- source notes
- completeness statement

### Entity

A character, class, perk, weapon, armor item, consumable, or other selectable
game concept. Each entity has a stable ID, display metadata, source provenance,
and typed gameplay properties.

### Build document

The minimal user-authored inputs necessary to reconstruct a build:

```ts
interface BuildDocument {
  schemaVersion: number;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  datasetId: string;
  characterId: string | null;
  classId: string | null;
  perkSelections: Array<{
    perkId: string;
    rank?: number;
    enabled?: boolean;
  }>;
  equipment: Record<string, string | null>;
  notes: string;
}
```

This shape is illustrative until initial game-data research confirms the
required concepts.

### Modifier

A typed operation applied to a named statistic. A normalized modifier records:

- source entity and human-readable label
- target statistic
- operation, such as add, multiply, set, minimum, or maximum
- numeric value
- condition, if any
- priority or calculation phase
- evidence confidence

### Calculation result

A non-persisted value containing the final total and ordered contributions used
to produce it. The UI uses the contributions to explain the result.

### Validation issue

A structured error, warning, or notice with related entity IDs and an optional
suggested resolution.

## Separation of concerns

Game entities describe facts. Rules describe how facts interact. Builds store
user intent. The calculation engine combines all three and returns results plus
validation issues. UI components must not contain game formulas.

## Versioning

Build schema and dataset version are separate:

- A schema migration changes the structure of saved build documents.
- A dataset migration maps selections when game content is renamed, removed, or
  materially changed.

Migration must be explicit and tested. Imported documents are validated before
they are written to browser storage.

