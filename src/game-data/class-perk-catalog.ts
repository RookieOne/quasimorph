import sourceCatalog from './class-perk-catalog.json';
import { parseClassPerkCatalog } from './class-perk-catalog-schema';

export const classPerkCatalog = parseClassPerkCatalog(sourceCatalog);
