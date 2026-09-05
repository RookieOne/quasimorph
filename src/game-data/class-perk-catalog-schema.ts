import { z } from 'zod';

const sourceIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9_]+$/);

const parameterSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[BIFS][A-Za-z0-9]+$/),
  value: z.union([z.boolean(), z.number().finite(), z.string().min(1)]),
});

const levelSchema = z.object({
  level: z.number().int().min(1).max(4),
  grade: z.enum(['basic', 'advanced', 'master', 'legend']),
  sourceId: sourceIdSchema,
  experienceToNextLevel: z.number().int().positive().nullable(),
  parameters: z.array(parameterSchema),
});

export const classPerkCatalogSchema = z
  .object({
    manifest: z.object({
      schemaVersion: z.literal(1),
      id: z.literal('qm-1-0-3-class-perk-catalog'),
      gameVersion: z.literal('1.0.3'),
      internalBuildId: z.string().min(1),
      language: z.literal('en'),
      capturedAt: z.iso.date(),
      coverage: z.object({
        classes: z.number().int().nonnegative(),
        perks: z.number().int().nonnegative(),
      }),
      source: z.object({
        type: z.literal('game-config'),
        asset: z.string().min(1),
        records: z.array(z.string().min(1)).min(1),
        sha256: z.string().regex(/^[a-f0-9]{64}$/),
        confidence: z.literal('verified'),
      }),
    }),
    classes: z.array(
      z.object({
        id: sourceIdSchema,
        name: z.string().min(1),
        perkIds: z.array(sourceIdSchema).length(6),
      }),
    ),
    perks: z.array(
      z.object({
        id: sourceIdSchema,
        name: z.string().min(1),
        kind: z.enum(['passive', 'trigger']),
        levelingAction: z.string().min(1),
        experiencePerAction: z.number().int().positive(),
        weaponClasses: z.array(z.string().min(1)),
        weaponSubclasses: z.array(z.string().min(1)),
        levels: z.array(levelSchema).length(4),
      }),
    ),
  })
  .superRefine((catalog, context) => {
    const classIds = catalog.classes.map(({ id }) => id);
    const perkIds = catalog.perks.map(({ id }) => id);
    checkUnique(classIds, 'class', ['classes'], context);
    checkUnique(perkIds, 'perk', ['perks'], context);

    const knownPerks = new Set(perkIds);
    catalog.classes.forEach((record, classIndex) => {
      record.perkIds.forEach((perkId, perkIndex) => {
        if (!knownPerks.has(perkId)) {
          context.addIssue({
            code: 'custom',
            message: `Unknown perk reference: ${perkId}`,
            path: ['classes', classIndex, 'perkIds', perkIndex],
          });
        }
      });
    });

    catalog.perks.forEach((perk, perkIndex) => {
      perk.levels.forEach((level, levelIndex) => {
        if (level.level !== levelIndex + 1 || level.sourceId !== `${perk.id}_${level.grade}`) {
          context.addIssue({
            code: 'custom',
            message: `Invalid level chain for perk ${perk.id}`,
            path: ['perks', perkIndex, 'levels', levelIndex],
          });
        }
        if (levelIndex < 3 && level.experienceToNextLevel === null) {
          context.addIssue({
            code: 'custom',
            message: `Non-final level must advance perk ${perk.id}`,
            path: ['perks', perkIndex, 'levels', levelIndex, 'experienceToNextLevel'],
          });
        }
      });
      if (perk.levels.at(-1)?.experienceToNextLevel !== null) {
        context.addIssue({
          code: 'custom',
          message: `Legend level must terminate perk ${perk.id}`,
          path: ['perks', perkIndex, 'levels', 3, 'experienceToNextLevel'],
        });
      }
    });

    if (catalog.manifest.coverage.classes !== catalog.classes.length) {
      context.addIssue({
        code: 'custom',
        message: 'Class coverage count mismatch',
        path: ['manifest'],
      });
    }
    if (catalog.manifest.coverage.perks !== catalog.perks.length) {
      context.addIssue({
        code: 'custom',
        message: 'Perk coverage count mismatch',
        path: ['manifest'],
      });
    }
  });

function checkUnique(ids: string[], label: string, path: PropertyKey[], context: z.RefinementCtx) {
  if (new Set(ids).size !== ids.length) {
    context.addIssue({ code: 'custom', message: `Duplicate ${label} ID`, path });
  }
}

export type ClassPerkCatalog = z.infer<typeof classPerkCatalogSchema>;

export function parseClassPerkCatalog(input: unknown): ClassPerkCatalog {
  return classPerkCatalogSchema.parse(input);
}
