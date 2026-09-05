import { z } from 'zod';

const idSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Expected a kebab-case stable ID');

const isoDateSchema = z.iso.date();

export const evidenceSchema = z.object({
  sourceType: z.enum(['synthetic', 'game-config', 'in-game', 'patch-note', 'wiki']),
  locator: z.string().min(1),
  gameVersion: z.string().min(1).optional(),
  capturedAt: isoDateSchema,
  confidence: z.enum(['verified', 'documented', 'inferred', 'unknown']),
  note: z.string().min(1).optional(),
});

const knownEffectSchema = z.object({
  kind: z.literal('stat-modifier'),
  statId: idSchema,
  operation: z.enum(['add', 'multiply', 'set', 'minimum', 'maximum']),
  value: z.number().finite(),
  unit: z.enum(['flat', 'percent', 'turns', 'count']),
  durationTurns: z.number().int().positive().optional(),
  conditionId: idSchema.optional(),
  evidence: evidenceSchema,
});

const capabilityEffectSchema = z.object({
  kind: z.literal('capability'),
  capabilityId: idSchema,
  enabled: z.boolean(),
  conditionId: idSchema.optional(),
  evidence: evidenceSchema,
});

const unknownEffectSchema = z.object({
  kind: z.literal('unknown'),
  description: z.string().min(1),
  evidence: evidenceSchema.extend({
    confidence: z.literal('unknown'),
  }),
});

export const perkEffectSchema = z.discriminatedUnion('kind', [
  knownEffectSchema,
  capabilityEffectSchema,
  unknownEffectSchema,
]);

export const perkLevelSchema = z.object({
  level: z.number().int().positive(),
  effects: z.array(perkEffectSchema).min(1),
});

const perkFields = {
  id: idSchema,
  name: z.string().min(1),
  description: z.string().min(1),
  levels: z.array(perkLevelSchema).min(1),
  applicability: z.array(idSchema).default([]),
  leveling: z.object({
    actionId: idSchema,
    description: z.string().min(1),
    experience: z.number().int().positive(),
  }),
  evidence: z.array(evidenceSchema).min(1),
};

const passivePerkSchema = z.object({
  ...perkFields,
  kind: z.literal('passive'),
});

const triggeredPerkSchema = z.object({
  ...perkFields,
  kind: z.literal('triggered'),
  activation: z.object({
    eventId: idSchema,
    description: z.string().min(1),
    conditions: z.array(idSchema).default([]),
  }),
});

export const perkSchema = z
  .discriminatedUnion('kind', [passivePerkSchema, triggeredPerkSchema])
  .superRefine((perk, context) => {
    const levels = perk.levels.map(({ level }) => level);
    const uniqueLevels = new Set(levels);

    if (uniqueLevels.size !== levels.length) {
      context.addIssue({
        code: 'custom',
        message: `Perk ${perk.id} contains duplicate levels`,
        path: ['levels'],
      });
    }

    if (levels.some((level, index) => index > 0 && level <= levels[index - 1])) {
      context.addIssue({
        code: 'custom',
        message: `Perk ${perk.id} levels must be ordered`,
        path: ['levels'],
      });
    }
  });

export const classSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  description: z.string().min(1),
  unlockType: z.enum(['starting', 'class-chip', 'unknown']),
  perkSlots: z
    .array(
      z.object({
        position: z.number().int().positive(),
        perkId: idSchema,
      }),
    )
    .min(1),
  evidence: z.array(evidenceSchema).min(1),
});

export const classPerkDatasetSchema = z
  .object({
    manifest: z.object({
      schemaVersion: z.literal(1),
      id: idSchema,
      contentStatus: z.enum(['placeholder', 'verified']),
      gameVersion: z.string().min(1),
      internalBuildId: z.string().min(1).nullable(),
      language: z.literal('en'),
      capturedAt: isoDateSchema,
      coverage: z.object({
        classes: z.object({
          included: z.number().int().nonnegative(),
          total: z.number().int().nonnegative().nullable(),
        }),
        perks: z.object({
          included: z.number().int().nonnegative(),
          total: z.number().int().nonnegative().nullable(),
        }),
      }),
      sources: z.array(evidenceSchema).min(1),
    }),
    classes: z.array(classSchema),
    perks: z.array(perkSchema),
  })
  .superRefine((dataset, context) => {
    const classIds = dataset.classes.map(({ id }) => id);
    const perkIds = dataset.perks.map(({ id }) => id);

    addDuplicateIssues(classIds, ['classes'], 'class', context);
    addDuplicateIssues(perkIds, ['perks'], 'perk', context);

    const knownPerkIds = new Set(perkIds);
    dataset.classes.forEach((classRecord, classIndex) => {
      const positions = classRecord.perkSlots.map(({ position }) => position);
      addDuplicateIssues(
        positions.map(String),
        ['classes', classIndex, 'perkSlots'],
        'slot position',
        context,
      );

      classRecord.perkSlots.forEach((slot, slotIndex) => {
        if (!knownPerkIds.has(slot.perkId)) {
          context.addIssue({
            code: 'custom',
            message: `Unknown perk reference: ${slot.perkId}`,
            path: ['classes', classIndex, 'perkSlots', slotIndex, 'perkId'],
          });
        }
      });
    });

    if (dataset.manifest.coverage.classes.included !== dataset.classes.length) {
      context.addIssue({
        code: 'custom',
        message: 'Class coverage count does not match class records',
        path: ['manifest', 'coverage', 'classes', 'included'],
      });
    }

    if (dataset.manifest.coverage.perks.included !== dataset.perks.length) {
      context.addIssue({
        code: 'custom',
        message: 'Perk coverage count does not match perk records',
        path: ['manifest', 'coverage', 'perks', 'included'],
      });
    }

    if (dataset.manifest.contentStatus === 'placeholder') {
      const hasNonSyntheticEvidence = [
        ...dataset.manifest.sources,
        ...dataset.classes.flatMap(({ evidence }) => evidence),
        ...dataset.perks.flatMap(({ evidence }) => evidence),
      ].some(({ sourceType }) => sourceType !== 'synthetic');

      if (hasNonSyntheticEvidence) {
        context.addIssue({
          code: 'custom',
          message: 'Placeholder datasets may only contain synthetic evidence',
          path: ['manifest', 'contentStatus'],
        });
      }
    }
  });

function addDuplicateIssues(
  ids: string[],
  path: PropertyKey[],
  label: string,
  context: z.RefinementCtx,
) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  ids.forEach((id) => {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  });

  duplicates.forEach((id) => {
    context.addIssue({
      code: 'custom',
      message: `Duplicate ${label} ID: ${id}`,
      path,
    });
  });
}

export type Evidence = z.infer<typeof evidenceSchema>;
export type PerkEffect = z.infer<typeof perkEffectSchema>;
export type Perk = z.infer<typeof perkSchema>;
export type ClassRecord = z.infer<typeof classSchema>;
export type ClassPerkDataset = z.infer<typeof classPerkDatasetSchema>;

export function parseClassPerkDataset(input: unknown): ClassPerkDataset {
  return classPerkDatasetSchema.parse(input);
}
