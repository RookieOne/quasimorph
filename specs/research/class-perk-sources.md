# Class and perk source research

**Research date:** 2026-09-05

**Target:** Quasimorph stable 1.0.3

## Version baseline

Quasimorph left Early Access with version 1.0 on 2026-07-31. The newest stable
release found in the developer's official Steam announcements is patch 1.0.3,
released on 2026-08-21.

Patch 1.0.3 matters to this dataset because it includes class/perk corrections:

- the Terror Pack's Insanity bonus was fixed to stack correctly during Baron
  transformation; and
- Ghost Killer was fixed so it no longer triggers on allies, and its description
  was revised to specify unseen enemies.

The initial dataset therefore targets `1.0.3`, not the less precise `1.0` label.
The manifest should additionally record the capture date and, when available,
the game's internal build identifier.

## Source hierarchy

Use sources in this order:

1. **Stable 1.0.3 game configuration and English localization files.** These are
   the best source for identifiers, level values, trigger definitions, and
   display text.
2. **Observed 1.0.3 in-game class and perk screens.** Use these to confirm what
   the player actually sees and to catch configuration behavior not exposed as
   plain data.
3. **Official developer patch notes.** Apply version-specific corrections and
   document behavior changes.
4. **Official Quasimorph Wiki on wiki.gg.** Use as a discovery and cross-checking
   aid. Treat values as documented rather than verified until compared with
   1.0.3 game data.
5. **Other community guides.** Use only to identify questions worth testing;
   never promote their values directly to verified data.

## Source assessment

### Official Steam announcements

Strong authority for release dates, patch version, and changed behavior. Patch
notes are deltas rather than a complete class/perk catalog, so they cannot be
the only dataset source.

- Release and patch feed:
  <https://steamcommunity.com/app/2059170/allnews/>
- Patch 1.0.3 announcement:
  <https://steamcommunity.com/ogg/2059170/announcements/detail/707780820824228898>

### Official Quasimorph Wiki

The Mercenary Classes page explains the core distinction between passive and
trigger perks and provides class tables with base effect, maximum effect,
activation, and leveling behavior. This is valuable evidence for our shape.

However, the indexed revision found during research was last edited on
2026-04-30, before the 1.0 release and before the 1.0.3 perk corrections. Its
values must not be labeled verified without a 1.0.3 comparison.

- <https://quasimorph.wiki.gg/wiki/Mercenary_Classes>

### Game configuration and modding interfaces

The official 1.0 patch notes state that game configuration was overhauled and
that an in-game mod manager was added. The official developer modding guide and
community tooling show that Quasimorph content is represented through game
configuration records and localization data.

This makes a local extraction from a legally installed 1.0.3 copy the preferred
way to establish exact class/perk records. Community modding repositories can
help locate record types but are not authoritative copies of current base data.

- Developer modding guide:
  <https://steamcommunity.com/sharedfiles/filedetails/?id=3281671312>
- Community content importer:
  <https://github.com/Crynano/QM-Content-Mod-Creator>

## Confirmed domain observations

The following concepts are sufficiently supported to guide a draft schema:

- A class owns an ordered set of perk slots.
- Perks are passive or triggered.
- A triggered perk has an activation condition and a temporary or immediate
  effect.
- Perks gain experience through perk-specific actions.
- Perks improve across levels; at minimum, source material distinguishes base
  and maximum effects.
- Class customization can replace perks, so a perk must be modeled independently
  and referenced by ID rather than embedded permanently in a class record.
- A perk may contain several simultaneous effects.
- Some effects are conditional on weapon categories, combat state, target
  visibility, addictions, carried weight, Quasimorphosis, or other context.

## Unresolved questions

- Which source parameters are additive, multiplicative, percentages, or display
  tokens, and in what calculation phase does each apply?
- Do class unlock/start-state rules live outside `config_mercenaries`?
- Which trigger enum values require additional runtime conditions not visible in
  the config row?
- Are all tooltip values derived from config, or are some produced in code?

## Local 1.0.3 extraction results

The copied Windows installation identifies its player bundle version as
`1.0.3.578s.024ad60`. Read-only extraction of `config_mercenaries` and
`localization` from `Quasimorph_Data/resources.assets` found:

- 14 mercenary classes;
- six ordered perk slots for every class;
- 79 distinct class perks;
- four explicit records per perk: basic, advanced, master, and legend; and
- passive/trigger type, leveling action and experience, weapon constraints, and
  source-native parameters for every level.

The captured `resources.assets` SHA-256 is
`8de90b24cdd608a3c14d4447d0e014315891783154644d22c29cb73806cde857`.
These observations resolve the inventory and grade-count questions for this
specific build. They do not resolve the runtime meaning or ordering of every
parameter.

The derived catalog is generated by
`scripts/extract-class-perk-catalog.py`; the installation remains ignored.

The inventory verification requirement is satisfied by the read-only local
export. Calculation-ready effect semantics still require code inspection or
complete in-game observation before they can be marked verified.
