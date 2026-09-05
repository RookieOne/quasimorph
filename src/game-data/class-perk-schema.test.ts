import { describe, expect, it } from 'vitest';
import { classPerkDataset } from './class-perk-placeholder';
import { parseClassPerkDataset } from './class-perk-schema';

function cloneDataset() {
  return structuredClone(classPerkDataset);
}

describe('class and perk dataset validation', () => {
  it('accepts the structural placeholder dataset', () => {
    expect(parseClassPerkDataset(classPerkDataset)).toEqual(classPerkDataset);
  });

  it('rejects duplicate class IDs', () => {
    const input = cloneDataset();
    input.classes[1].id = input.classes[0].id;

    expect(() => parseClassPerkDataset(input)).toThrow(/Duplicate class ID/);
  });

  it('rejects unresolved class perk references', () => {
    const input = cloneDataset();
    input.classes[0].perkSlots[0].perkId = 'missing-perk';

    expect(() => parseClassPerkDataset(input)).toThrow(/Unknown perk reference/);
  });

  it('rejects duplicate and unordered perk levels', () => {
    const input = cloneDataset();
    input.perks[0].levels[1].level = 1;

    expect(() => parseClassPerkDataset(input)).toThrow(/duplicate levels/);
  });

  it('requires triggered perks to define activation behavior', () => {
    const input = cloneDataset() as unknown as {
      perks: Array<Record<string, unknown>>;
    };
    delete input.perks[1].activation;

    expect(() => parseClassPerkDataset(input)).toThrow();
  });

  it('rejects incorrect manifest coverage', () => {
    const input = cloneDataset();
    input.manifest.coverage.perks.included = 99;

    expect(() => parseClassPerkDataset(input)).toThrow(/coverage count/);
  });

  it('requires unknown effects to carry unknown confidence', () => {
    const input = cloneDataset() as unknown as {
      perks: Array<{
        levels: Array<{
          effects: Array<{ evidence: { confidence: string } }>;
        }>;
      }>;
    };
    input.perks[3].levels[0].effects[0].evidence.confidence = 'verified';

    expect(() => parseClassPerkDataset(input)).toThrow();
  });
});
