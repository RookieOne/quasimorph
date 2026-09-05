import { parseClassPerkDataset } from './class-perk-schema';

const placeholderEvidence = {
  sourceType: 'synthetic' as const,
  locator: 'specs/006-class-perk-data.md',
  gameVersion: '1.0.3',
  capturedAt: '2026-09-05',
  confidence: 'unknown' as const,
  note: 'Placeholder structure only; not extracted from Quasimorph.',
};

export const classPerkDataset = parseClassPerkDataset({
  manifest: {
    schemaVersion: 1,
    id: 'qm-1-0-3-class-perk-placeholder',
    contentStatus: 'placeholder',
    gameVersion: '1.0.3',
    internalBuildId: null,
    language: 'en',
    capturedAt: '2026-09-05',
    coverage: {
      classes: { included: 2, total: null },
      perks: { included: 4, total: null },
    },
    sources: [placeholderEvidence],
  },
  classes: [
    {
      id: 'prototype-vanguard',
      name: 'Prototype Vanguard',
      description: 'Synthetic front-line class used to validate data relationships.',
      unlockType: 'starting',
      perkSlots: [
        { position: 1, perkId: 'field-conditioning' },
        { position: 2, perkId: 'counter-pressure' },
      ],
      evidence: [placeholderEvidence],
    },
    {
      id: 'prototype-specialist',
      name: 'Prototype Specialist',
      description: 'Synthetic technical class used to exercise conditional effects.',
      unlockType: 'class-chip',
      perkSlots: [
        { position: 1, perkId: 'measured-response' },
        { position: 2, perkId: 'unresolved-protocol' },
      ],
      evidence: [placeholderEvidence],
    },
  ],
  perks: [
    {
      id: 'field-conditioning',
      name: 'Field Conditioning',
      description: 'Synthetic passive perk with explicit level values.',
      kind: 'passive',
      levels: [
        {
          level: 1,
          effects: [
            {
              kind: 'stat-modifier',
              statId: 'max-health',
              operation: 'add',
              value: 10,
              unit: 'flat',
              evidence: placeholderEvidence,
            },
          ],
        },
        {
          level: 2,
          effects: [
            {
              kind: 'stat-modifier',
              statId: 'max-health',
              operation: 'add',
              value: 20,
              unit: 'flat',
              evidence: placeholderEvidence,
            },
          ],
        },
      ],
      applicability: [],
      leveling: {
        actionId: 'receive-damage',
        description: 'Synthetic leveling action.',
        experience: 2,
      },
      evidence: [placeholderEvidence],
    },
    {
      id: 'counter-pressure',
      name: 'Counter Pressure',
      description: 'Synthetic triggered perk with a temporary multi-effect bonus.',
      kind: 'triggered',
      activation: {
        eventId: 'enemy-attack-missed',
        description: 'Activates after an enemy attack misses.',
        conditions: ['in-combat'],
      },
      levels: [
        {
          level: 1,
          effects: [
            {
              kind: 'stat-modifier',
              statId: 'action-points',
              operation: 'add',
              value: 1,
              unit: 'flat',
              durationTurns: 2,
              evidence: placeholderEvidence,
            },
            {
              kind: 'stat-modifier',
              statId: 'dodge-chance',
              operation: 'add',
              value: 10,
              unit: 'percent',
              durationTurns: 2,
              evidence: placeholderEvidence,
            },
          ],
        },
      ],
      applicability: [],
      leveling: {
        actionId: 'trigger-activation',
        description: 'Synthetic leveling action.',
        experience: 5,
      },
      evidence: [placeholderEvidence],
    },
    {
      id: 'measured-response',
      name: 'Measured Response',
      description: 'Synthetic passive perk restricted to a placeholder weapon family.',
      kind: 'passive',
      levels: [
        {
          level: 1,
          effects: [
            {
              kind: 'stat-modifier',
              statId: 'ranged-accuracy',
              operation: 'add',
              value: 8,
              unit: 'percent',
              conditionId: 'using-prototype-sidearm',
              evidence: placeholderEvidence,
            },
          ],
        },
      ],
      applicability: ['prototype-sidearm'],
      leveling: {
        actionId: 'ranged-hit',
        description: 'Synthetic leveling action.',
        experience: 2,
      },
      evidence: [placeholderEvidence],
    },
    {
      id: 'unresolved-protocol',
      name: 'Unresolved Protocol',
      description: 'Synthetic record demonstrating explicitly unknown behavior.',
      kind: 'passive',
      levels: [
        {
          level: 1,
          effects: [
            {
              kind: 'unknown',
              description: 'Effect awaits verified game data.',
              evidence: placeholderEvidence,
            },
          ],
        },
      ],
      applicability: [],
      leveling: {
        actionId: 'unknown-action',
        description: 'Leveling behavior awaits verified game data.',
        experience: 1,
      },
      evidence: [placeholderEvidence],
    },
  ],
});
