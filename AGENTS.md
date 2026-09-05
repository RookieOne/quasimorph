# Repository guidance

## Project

Quasimorph Build Calculator is a static React and TypeScript application for
planning Quasimorph classes, perks, and eventually complete character builds.
It uses Vite, Tailwind CSS, and GitHub Pages.

The live site is <https://rookieone.github.io/quasimorph/>.

## Development process

- Use specification-driven development. Read the relevant files in `specs/`
  before implementing behavior.
- Add or revise acceptance criteria before adding user-visible features.
- Keep `specs/WIP-ROADMAP.md` current when a phase starts or finishes.
- Work on a focused branch and deliver changes through a pull request.
- Follow the Conventional Commits rules in `CONTRIBUTING.md`.
- Preserve unrelated user changes and keep commits scoped and reviewable.

## Game data

- Never commit files from `local-game-files/`.
- Treat the supported game version as part of every dataset's identity.
- Keep game data, calculation rules, user build data, and UI code separate.
- Every gameplay value requires provenance and an evidence confidence level.
- Do not promote wiki or community values to `verified` without comparison to
  the supported game version.
- Represent unknown behavior explicitly. Never turn an unknown into a guessed
  formula or modifier.
- Synthetic fixtures must be unmistakably labeled and must not be presented as
  real game data.

## Application architecture

- Keep calculation and validation modules framework-independent and testable as
  pure TypeScript.
- UI components must not contain game formulas.
- Use semantic Tailwind theme tokens instead of scattered arbitrary colors.
- Reuse accessible primitives in `src/components/ui/` for interactive controls.
- Keep the core application static and client-side unless an accepted spec
  establishes a concrete backend requirement.
- Preserve compatibility with the `/quasimorph/` GitHub Pages base path.

## Verification

Run checks appropriate to the change. Before considering a pull request ready,
the full expected gate is:

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run build:pages
```

Confirm game-data schema changes with both valid and invalid fixtures. Confirm
calculation changes with boundary cases and modifier interactions.
