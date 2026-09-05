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

Define validated, versioned entity schemas; record provenance and confidence;
and add a deliberately small sample dataset. No formulas should be guessed.

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
