# 000 — Product overview

**Status:** Accepted  
**Last updated:** 2026-09-05

## Summary

The Quasimorph Build Calculator is a static web application for constructing,
validating, saving, and comparing character builds. Its primary value is
turning a collection of character choices into transparent calculated results.

## Target user

A player who wants to answer questions such as:

- What stats and resistances will this combination produce?
- Are these character, class, perk, and equipment choices compatible?
- What changed when I replaced one part of the build?
- Can I preserve or share this setup for a later run?

## Product goals

- Provide a fast calculator with immediate feedback.
- Make every result explainable through a calculation breakdown.
- Support saved and portable builds without requiring authentication.
- Offer a polished, responsive experience suitable as a portfolio project.
- Make game-data updates possible without rewriting the interface.

## Non-goals for the first release

- User accounts or cross-device synchronization
- Community ratings, comments, or public build discovery
- Collaborative editing
- A general-purpose Quasimorph wiki
- Automated extraction of data from game files
- Claiming accuracy for rules that have not been sourced or verified

## Success criteria

- A first-time visitor can create a build without instructions.
- Changing a choice updates dependent results immediately.
- A user can inspect why a calculated value has its current value.
- Invalid combinations are prevented or clearly explained.
- A saved build survives a page reload in the same browser.
- The application can be deployed as static files on GitHub Pages.

## Future opportunities

- Side-by-side build comparison
- URL-based build sharing
- Searchable item and perk database
- Importing verified community-maintained datasets
- Optional hosted synchronization if demand justifies a backend

