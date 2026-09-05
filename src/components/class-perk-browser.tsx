import { Dialog } from '@base-ui/react/dialog';
import { Search, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ClassPerkCatalog } from '@/game-data/class-perk-catalog-schema';

type ClassRecord = ClassPerkCatalog['classes'][number];
type PerkRecord = ClassPerkCatalog['perks'][number];

export function filterClasses(classes: ClassRecord[], query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase('en');
  if (!normalizedQuery) return classes;
  return classes.filter(({ name }) => name.toLocaleLowerCase('en').includes(normalizedQuery));
}

export function ClassSelectionDialog({
  classes,
  open,
  selectedClassId,
  finalFocus,
  onClose,
  onSelect,
}: {
  classes: ClassRecord[];
  open: boolean;
  selectedClassId: string;
  finalFocus: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  onSelect: (classRecord: ClassRecord) => void;
}) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const matches = filterClasses(classes, query);

  return (
    <Dialog.Root
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setQuery('');
          onClose();
        }
      }}
      open={open}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="class-dialog-backdrop" />
        <Dialog.Viewport className="class-dialog-viewport">
          <Dialog.Popup className="class-dialog" finalFocus={finalFocus} initialFocus={searchRef}>
            <div className="class-dialog__header">
              <div>
                <span className="data-label">Verified inventory</span>
                <Dialog.Title className="class-dialog__title">Select mercenary class</Dialog.Title>
              </div>
              <Dialog.Close aria-label="Close class selection" className="icon-button">
                <X aria-hidden="true" />
              </Dialog.Close>
            </div>

            <label className="class-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Search classes</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search classes"
                ref={searchRef}
                type="search"
                value={query}
              />
            </label>

            <div className="class-options">
              {matches.length ? (
                matches.map((classRecord) => {
                  const selected = classRecord.id === selectedClassId;
                  return (
                    <button
                      aria-pressed={selected}
                      className="class-option"
                      key={classRecord.id}
                      onClick={() => {
                        setQuery('');
                        onSelect(classRecord);
                      }}
                      type="button"
                    >
                      <span>
                        <strong>{classRecord.name}</strong>
                        <small>{classRecord.perkIds.length} source-ordered perks</small>
                      </span>
                      <span className="class-option__status">
                        {selected ? 'Selected' : 'Choose'}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="class-options__empty">
                  <strong>No matching classes</strong>
                  <span>Try a different English class name.</span>
                </div>
              )}
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function displayRestriction(values: string[]) {
  return values.length ? values.join(', ') : 'None';
}

function displayParameterValue(value: boolean | number | string) {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
}

export function PerkBrowser({ perks }: { perks: PerkRecord[] }) {
  return (
    <ol className="perk-browser" aria-label="Selected class perks">
      {perks.map((perk, index) => (
        <li key={perk.id}>
          <details className="perk-record">
            <summary>
              <span className="perk-record__position">{String(index + 1).padStart(2, '0')}</span>
              <span className="perk-record__identity">
                <strong>{perk.name}</strong>
                <small>{perk.kind === 'trigger' ? 'Triggered' : 'Passive'} perk</small>
              </span>
              <span className="perk-record__action">Inspect</span>
            </summary>

            <div className="perk-record__body">
              <dl className="perk-metadata">
                <div>
                  <dt>Source ID</dt>
                  <dd>{perk.id}</dd>
                </div>
                <div>
                  <dt>Leveling action</dt>
                  <dd>{perk.levelingAction}</dd>
                </div>
                <div>
                  <dt>Experience / action</dt>
                  <dd>{perk.experiencePerAction}</dd>
                </div>
                <div>
                  <dt>Weapon classes</dt>
                  <dd>{displayRestriction(perk.weaponClasses)}</dd>
                </div>
                <div>
                  <dt>Weapon subclasses</dt>
                  <dd>{displayRestriction(perk.weaponSubclasses)}</dd>
                </div>
              </dl>

              <div className="perk-levels">
                {perk.levels.map((level) => (
                  <section
                    aria-labelledby={`${perk.id}-${level.grade}`}
                    className="perk-level"
                    key={level.grade}
                  >
                    <div className="perk-level__heading">
                      <h3 id={`${perk.id}-${level.grade}`}>{level.grade}</h3>
                      <span>
                        {level.experienceToNextLevel === null
                          ? 'Maximum level'
                          : `${level.experienceToNextLevel} XP to next level`}
                      </span>
                    </div>
                    <dl className="parameter-list">
                      {level.parameters.map((parameter) => (
                        <div key={parameter.id}>
                          <dt>{parameter.id}</dt>
                          <dd>{displayParameterValue(parameter.value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
