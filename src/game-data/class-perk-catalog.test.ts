import { describe, expect, it } from 'vitest';
import { classPerkCatalog } from './class-perk-catalog';
import { parseClassPerkCatalog } from './class-perk-catalog-schema';

describe('verified class and perk catalog', () => {
  it('contains the complete 1.0.3 class inventory', () => {
    expect(classPerkCatalog.manifest.internalBuildId).toBe('1.0.3.578s.024ad60');
    expect(classPerkCatalog.classes).toHaveLength(14);
    expect(classPerkCatalog.perks).toHaveLength(79);
    expect(classPerkCatalog.classes.every(({ perkIds }) => perkIds.length === 6)).toBe(true);
  });

  it('retains localized names and source-native level parameters', () => {
    const angels = classPerkCatalog.classes.find(({ id }) => id === 'angels_of_spades');
    const ghostKiller = classPerkCatalog.perks.find(({ id }) => id === 'ghost_killer');

    expect(angels?.name).toBe('Angels of Spades');
    expect(angels?.perkIds).toContain('ghost_killer');
    expect(ghostKiller?.name).toBe('Ghost Killer');
    expect(ghostKiller?.levels).toHaveLength(4);
    expect(ghostKiller?.levels[0].parameters.length).toBeGreaterThan(0);
  });

  it('rejects unresolved class references', () => {
    const invalid = structuredClone(classPerkCatalog);
    invalid.classes[0].perkIds[0] = 'missing_perk';

    expect(() => parseClassPerkCatalog(invalid)).toThrow(/Unknown perk reference/);
  });

  it('rejects a broken source level chain', () => {
    const invalid = structuredClone(classPerkCatalog);
    invalid.perks[0].levels[0].sourceId = 'wrong_basic';

    expect(() => parseClassPerkCatalog(invalid)).toThrow(/Invalid level chain/);
  });

  it('rejects a non-final level without a progression threshold', () => {
    const invalid = structuredClone(classPerkCatalog);
    invalid.perks[0].levels[1].experienceToNextLevel = null;

    expect(() => parseClassPerkCatalog(invalid)).toThrow(/Non-final level must advance/);
  });
});
