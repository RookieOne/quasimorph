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

- What is the exact number and identity of classes in stable 1.0.3?
- Does every class have the same number of editable perk slots?
- How many perk levels exist, and are intermediate values explicitly stored or
  calculated?
- Which config records provide stable IDs for classes, perks, triggers, effects,
  and localized strings?
- Are all tooltip values derived from config, or are some produced in code?
- How are class unlock state and starting classes represented?
- How does the class editor restrict replacements, if at all?
- What internal build ID corresponds to the public 1.0.3 release?

## Verification requirement

Do not populate the production dataset from the wiki alone. Before accepting the
data spec, obtain one of the following:

- a read-only export of relevant class, perk, and English localization records
  from a stable 1.0.3 installation; or
- a complete set of stable 1.0.3 in-game screenshots covering every class, perk
  level, activation condition, and leveling rule.

The first option is more reliable and easier to regression-test.
