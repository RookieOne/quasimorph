# Specifications

Specifications in this directory are versioned with the implementation. They
describe intended behavior and provide the acceptance criteria used to decide
whether a feature is complete.

## Index

- [`000-product-overview.md`](./000-product-overview.md) — product goals, users,
  scope, and success criteria
- [`001-mvp-calculator.md`](./001-mvp-calculator.md) — first usable vertical
  slice and acceptance criteria
- [`002-domain-model.md`](./002-domain-model.md) — game data, builds, rules, and
  calculation results
- [`003-interface-and-theme.md`](./003-interface-and-theme.md) — layout,
  responsive behavior, accessibility, and Tailwind theme direction
- [`004-architecture.md`](./004-architecture.md) — frontend architecture,
  persistence, testing, and deployment
- [`005-application-foundation.md`](./005-application-foundation.md) — initial
  application shell, theme, quality checks, and deployment foundation
- [`006-class-perk-data.md`](./006-class-perk-data.md) — versioned class and perk
  records, evidence, validation, and initial dataset
- [`research/class-perk-sources.md`](./research/class-perk-sources.md) — game
  version and class/perk source assessment
- [`WIP-ROADMAP.md`](./WIP-ROADMAP.md) — living sequence of planned pull requests
- [`template.md`](./template.md) — starting point for new feature specs

## Spec-driven workflow

Every user-visible feature begins with a spec or a revision to an existing one.
A feature spec should answer:

- What user problem does this solve?
- What is in and out of scope?
- Which inputs and outputs are observable?
- What rules or source data does it depend on?
- How will we verify it?

Specs use the following lifecycle:

1. **Draft** — behavior or dependencies are still being decided.
2. **Accepted** — scope and acceptance criteria are ready for implementation.
3. **Implemented** — all acceptance criteria are met and verified.
4. **Superseded** — a later spec replaces the behavior.

Implementation may expose a flawed assumption. In that case, revise the spec in
the same change as the code. The spec is a living contract, not an immutable
prediction.

## Game-rule evidence

Calculation behavior must identify its evidence in either the relevant spec or
the game-data record. Use one of these confidence labels:

- **verified** — reproduced in the supported game version
- **documented** — stated by an authoritative game source but not reproduced
- **inferred** — supported by observed behavior but not conclusively verified
- **unknown** — unresolved and therefore not used as an authoritative formula

Rules labeled `inferred` must be visible as such in developer-facing data.
Rules labeled `unknown` must not silently affect calculator results.
