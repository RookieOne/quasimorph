# 004 — Frontend architecture

**Status:** Accepted  
**Last updated:** 2026-09-05

## Decision

Build the initial product as a static client-side application using React,
TypeScript, Vite, and Tailwind CSS. Deploy generated assets to GitHub Pages.
Do not introduce a backend for the MVP.

## Rationale

All MVP behavior can run deterministically from bundled game data and
user-authored inputs. Avoiding a backend keeps hosting simple, removes account
and privacy concerns, and allows the calculator to continue working after its
assets have loaded.

## Boundaries

The codebase should have distinct modules for:

- `game-data` — versioned entities and provenance
- `rules` — pure calculation and compatibility logic
- `builds` — document creation, validation, migration, import, and export
- `storage` — a replaceable persistence interface
- `features` — user-facing workflows
- `ui` — reusable presentational components and theme primitives

Dependencies flow inward toward domain types and pure rules. Calculation modules
must not import React, browser storage, or UI components.

## State and persistence

- Ephemeral editor state remains in the client application.
- Saved builds use a storage interface initially backed by `localStorage`.
- Writes validate the document and handle unavailable or full storage.
- A storage adapter allows a future hosted implementation without changing the
  calculator domain.
- Export is the recovery and portability mechanism for the MVP.

## Routing

Routing must remain compatible with static GitHub Pages hosting. The initial
implementation should prefer a small route surface and choose either hash-based
routing or an explicitly tested static fallback before nested routes are added.

## Testing strategy

- Unit tests for pure calculations, validation, and migrations
- Fixture tests for known complete builds and expected breakdowns
- Component tests for critical selections and validation feedback
- A small browser-level smoke test for create, save, reload, export, and import
- Automated type checking, linting, and tests before deployment

Every verified game formula requires at least one positive case, boundary case,
and modifier-interaction case.

## Deployment

A GitHub Actions workflow should build and test the project, then publish the
static output to GitHub Pages. The Vite base path must be configured for both a
repository subpath and an optional future custom domain.

## Backend threshold

Revisit a backend only when an accepted feature requires shared mutable state,
such as accounts, cross-device synchronization, community publishing, ratings,
comments, or collaborative editing. Public sharing alone should first be
evaluated using a versioned URL encoding or downloadable build document.
