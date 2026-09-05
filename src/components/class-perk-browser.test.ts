import { describe, expect, it } from 'vitest';
import { classPerkCatalog } from '@/game-data/class-perk-catalog';
import { filterClasses } from './class-perk-browser';

describe('class filtering', () => {
  it('returns source order for an empty query', () => {
    expect(filterClasses(classPerkCatalog.classes, '')).toEqual(classPerkCatalog.classes);
  });

  it('matches English names case-insensitively', () => {
    expect(filterClasses(classPerkCatalog.classes, '  ANGEL  ').map(({ id }) => id)).toEqual([
      'angels_of_spades',
    ]);
  });

  it('returns no records for a missing name', () => {
    expect(filterClasses(classPerkCatalog.classes, 'not-a-class')).toEqual([]);
  });
});
