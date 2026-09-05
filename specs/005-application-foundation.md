# 005 — Application foundation

**Status:** Implemented  
**Last updated:** 2026-09-05

## Problem

The calculator needs a deployable, tested application shell before game data or
calculation behavior can be implemented. The foundation must establish the
project's visual language and engineering checks without prematurely encoding
game rules.

## Scope

- Scaffold a React, TypeScript, Vite, and Tailwind CSS application.
- Establish semantic industrial-theme tokens.
- Provide a responsive application shell with planned primary destinations.
- Show representative calculator content without implementing calculator logic.
- Configure formatting, linting, type checking, and tests.
- Add continuous integration for pull requests and branches.
- Add a GitHub Pages deployment workflow for `main`.
- Document local development commands.

## Out of scope

- Authoritative game data or formulas
- Editable calculator controls
- Persistence, build import, or build export
- User accounts or server-side behavior
- Completed Database, Compare, or About experiences

## Interface behavior

The initial route is a recognizable calculator workspace rather than a
marketing page. It contains:

- global product identity and navigation;
- a build identity and dataset-coverage indicator;
- representative character, class, and equipment selections;
- representative calculated totals and a validation summary; and
- clear labels distinguishing preview content from verified game data.

Navigation destinations that are not implemented remain visibly unavailable or
are represented as planned destinations without routing users to empty pages.

## Theme contract

Components consume semantic theme values for canvas, surfaces, text, borders,
signal, positive, warning, and danger states. Focus treatment and stat direction
must not rely on color alone.

## Acceptance criteria

- A clean dependency install can start the development application.
- The application builds into static production assets.
- The production asset base works from the `/quasimorph/` repository path.
- The initial viewport clearly communicates that this is a Quasimorph build
  calculator and exposes the calculator workspace.
- The layout remains usable at 320 CSS pixels and at desktop widths.
- All available interactions are operable with a keyboard and have visible
  focus treatment.
- Application colors are defined through shared semantic theme tokens.
- Type checking, linting, and automated tests pass locally.
- Continuous integration runs build, type, lint, and test checks.
- The deployment workflow publishes successful `main` builds to GitHub Pages.
- The UI states that included values are representative preview data.

## Verification

- Run formatting verification, linting, type checking, tests, and production
  build.
- Exercise the application shell at narrow and wide viewport sizes.
- Confirm the built asset URLs use the configured GitHub Pages base path.
- Confirm the deployment workflow uses the supported GitHub Pages artifact flow.
