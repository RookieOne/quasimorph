# Work-in-progress roadmap

**Status:** Living plan  
**Last updated:** 2026-09-05

This roadmap organizes development into reviewable pull requests. It records
sequencing rather than replacing each feature's behavioral specification.

## Phase 1 — Application foundation

**Spec:** [`005-application-foundation.md`](./005-application-foundation.md)  
**Branch:** `feat/application-foundation`  
**Status:** Complete

Create a deployable React, TypeScript, Vite, and Tailwind application with the
custom theme, responsive shell, automated checks, and GitHub Pages workflow.

## Phase 2 — Game-data schema and fixtures

**Spec:** [`006-class-perk-data.md`](./006-class-perk-data.md)

**Branch:** `feat/class-perk-data`

**Status:** Foundation and verified inventory complete; effect mapping deferred

Define validated, versioned class and perk schemas; record provenance and
confidence; retain the synthetic shape fixture; and extract the complete 1.0.3
class/perk inventory. Mapping source parameters to calculation semantics is
deferred so no formulas are guessed. Operatives, equipment, and unrelated game
entities remain out of scope.

## Phase 2.5 — Verified class and perk browser

**Spec:** [`007-verified-class-perk-browser.md`](./007-verified-class-perk-browser.md)

**Branch:** `feat/verified-class-perk-browser`

**Status:** Complete

Connect the verified 1.0.3 inventory to the existing shell through searchable
class selection and inspectable ordered perk details. Keep raw source parameters
separate from synthetic preview calculations and unverified formula semantics.

## Phase 3 — Calculation engine

Implement framework-independent modifier ordering, totals, breakdowns, and
validation using pure functions and verified fixtures.

## Phase 4 — First usable calculator

Connect character, class, perk, and equipment selection to the calculation
engine. Deliver the first complete interactive planning workflow.

## Phase 5 — Persistence and portability

Save builds locally and add validated, versioned JSON import and export with
safe migrations.

## Phase 6 — Verified dataset expansion

Expand supported game content and calculation coverage while making dataset
completeness and supported game versions visible.

## Phase 7 — Comparison and reference database

Add side-by-side build comparison and searchable reference views using the
shared data and calculation models.

## Phase 8 — Release hardening

Complete accessibility, responsive, performance, metadata, documentation, and
release verification before declaring the first stable version.

## Planning rules

- Each phase is delivered through one or more focused pull requests.
- Every pull request names the specification it implements.
- Unverified game behavior is recorded as a question, not encoded as fact.
- A phase may be split when doing so improves reviewability.
- This file is updated when sequencing changes or a phase completes.
