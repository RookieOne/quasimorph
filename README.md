# Quasimorph Build Calculator

A fan-made character build calculator for planning and comparing Quasimorph
characters, classes, perks, and equipment.

The project is designed as a static, client-side web application built with
React, TypeScript, Vite, and a customized Tailwind CSS theme. Builds are stored
in the browser and can be exported without requiring an account or backend.

## Project status

The project is currently in the specification phase. Product and technical
decisions live in [`specs/`](./specs/README.md) and are treated as part of the
source, not as separate project-management documents.

## Product principles

- Calculations must be explainable and traceable to their inputs.
- Game data and calculation rules must be separated from UI code.
- Unknown game behavior must be documented rather than guessed.
- The core calculator must work without an account or network connection.
- The interface should feel inspired by Quasimorph without copying its UI.
- Accessibility and legibility take priority over decorative effects.

## Proposed stack

- React and TypeScript
- Vite
- Tailwind CSS with project-specific design tokens
- Vitest and Testing Library
- Browser storage for saved builds
- GitHub Actions and GitHub Pages

## Development workflow

Before implementing a feature:

1. Add or update its specification.
2. Define observable acceptance criteria.
3. Identify game-data sources and unresolved rules.
4. Implement the smallest complete vertical slice.
5. Test calculations independently from UI components.
6. Update the specification if implementation reveals a better decision.

See [`specs/README.md`](./specs/README.md) for the full process.

## Disclaimer

This is an unofficial fan project and is not affiliated with, endorsed by, or
sponsored by the developers or publishers of Quasimorph. Game names and related
marks belong to their respective owners.

