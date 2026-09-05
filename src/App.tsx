import {
  Activity,
  AlertTriangle,
  Archive,
  ChevronRight,
  Crosshair,
  FlaskConical,
  Menu,
  Plus,
  Shield,
  UserRound,
} from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { ClassSelectionDialog, PerkBrowser } from '@/components/class-perk-browser';
import { Button } from '@/components/ui/button';
import { classPerkCatalog } from '@/game-data/class-perk-catalog';

const attributes = [
  { label: 'Max health', value: '118', delta: '+18' },
  { label: 'Max weight', value: '32 kg', delta: '+4' },
  { label: 'Dodge', value: '7%', delta: '+2%' },
  { label: 'Pain threshold', value: '86', delta: '+6' },
];

const resistances = [
  { label: 'Blunt', value: 42 },
  { label: 'Pierce', value: 36 },
  { label: 'Cut', value: 51 },
  { label: 'Fire', value: 18 },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-label">
      <span aria-hidden="true" className="section-label__mark" />
      {children}
    </h2>
  );
}

function SelectionCard({
  eyebrow,
  title,
  detail,
  icon,
  onClick,
  buttonRef,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  icon: React.ReactNode;
  onClick?: () => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button className="selection-card" onClick={onClick} ref={buttonRef} type="button">
      <span className="selection-card__icon">{icon}</span>
      <span className="min-w-0 text-left">
        <span className="selection-card__eyebrow">{eyebrow}</span>
        <strong className="selection-card__title">{title}</strong>
        <span className="selection-card__detail">{detail}</span>
      </span>
      <ChevronRight aria-hidden="true" className="ml-auto size-4 text-ink-faint" />
    </button>
  );
}

export function App() {
  const [selectedClassId, setSelectedClassId] = useState(classPerkCatalog.classes[0].id);
  const [classDialogOpen, setClassDialogOpen] = useState(false);
  const classButtonRef = useRef<HTMLButtonElement>(null);
  const selectedClass =
    classPerkCatalog.classes.find(({ id }) => id === selectedClassId) ??
    classPerkCatalog.classes[0];

  const selectedPerks = useMemo(
    () =>
      selectedClass.perkIds.map((perkId) => {
        const perk = classPerkCatalog.perks.find(({ id }) => id === perkId);
        if (!perk) throw new Error(`Validated catalog is missing perk ${perkId}`);
        return perk;
      }),
    [selectedClass],
  );

  function closeClassDialog() {
    setClassDialogOpen(false);
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="topbar">
        <a className="brand" href="#workspace" aria-label="Quasimorph Calculator home">
          <span className="brand__sigil" aria-hidden="true">
            Q
          </span>
          <span>
            <strong className="brand__name">Quasimorph</strong>
            <span className="brand__descriptor">Build calculator</span>
          </span>
        </a>

        <nav aria-label="Primary navigation" className="topbar__nav">
          <a className="nav-link nav-link--active" href="#workspace">
            Calculator
          </a>
          <button className="nav-link" disabled type="button">
            Database <span className="nav-link__status">Planned</span>
          </button>
          <button className="nav-link" disabled type="button">
            Compare <span className="nav-link__status">Planned</span>
          </button>
        </nav>

        <Button className="hidden sm:inline-flex" variant="outline">
          <Archive /> Builds
        </Button>
        <Button aria-label="Open navigation" className="sm:hidden" variant="ghost">
          <Menu />
        </Button>
      </header>

      <main id="workspace" className="workspace">
        <section className="build-heading" aria-labelledby="build-name">
          <div>
            <div className="status-line">
              <span className="status-dot" /> Draft build
              <span aria-hidden="true">/</span>
              <span>Local workspace</span>
            </div>
            <h1 id="build-name">Mercury Protocol</h1>
            <p>
              Assemble an operative, trace every modifier, and understand the cost before
              deployment.
            </p>
          </div>
          <Button>
            <Plus /> New build
          </Button>
        </section>

        <aside className="coverage-notice" aria-label="Dataset coverage notice">
          <FlaskConical aria-hidden="true" />
          <div>
            <strong>Verified game inventory</strong>
            <span>
              Class and perk records come from game configuration. Raw parameter meanings and
              calculation behavior remain unresolved.
            </span>
          </div>
          <span className="coverage-notice__tag">
            {classPerkCatalog.manifest.gameVersion} · {classPerkCatalog.manifest.internalBuildId} ·{' '}
            {classPerkCatalog.manifest.coverage.classes} classes /{' '}
            {classPerkCatalog.manifest.coverage.perks} perks
          </span>
        </aside>

        <div className="calculator-grid">
          <section className="panel panel--selections" aria-labelledby="selections-title">
            <SectionLabel>Build selections</SectionLabel>
            <h2 className="sr-only" id="selections-title">
              Build selections
            </h2>
            <div className="selection-stack">
              <SelectionCard
                detail="Health-focused baseline"
                eyebrow="Operative"
                icon={<UserRound />}
                title="Isabella Capet"
              />
              <SelectionCard
                buttonRef={classButtonRef}
                detail={`${selectedClass.perkIds.length} verified source-ordered perks`}
                eyebrow="Class"
                icon={<Crosshair />}
                onClick={() => setClassDialogOpen(true)}
                title={selectedClass.name}
              />
            </div>

            <div className="panel-section">
              <div className="panel-section__heading">
                <SectionLabel>Equipment</SectionLabel>
                <span>3 / 6 slots</span>
              </div>
              <div className="equipment-list">
                <SelectionCard
                  detail="Primary weapon · 9 mm"
                  eyebrow="Hands"
                  icon={<Crosshair />}
                  title="Retribution"
                />
                <SelectionCard
                  detail="Medium armor"
                  eyebrow="Body"
                  icon={<Shield />}
                  title="Glory Armor"
                />
                <button className="empty-slot" type="button">
                  <Plus aria-hidden="true" /> Add backpack
                </button>
              </div>
            </div>
          </section>

          <section className="panel panel--loadout" aria-labelledby="loadout-title">
            <div className="panel-title-row">
              <div>
                <SectionLabel>Current loadout</SectionLabel>
                <h2 id="loadout-title">Deployment profile</h2>
              </div>
              <span className="readiness-badge">
                <Activity aria-hidden="true" /> Incomplete
              </span>
            </div>

            <div className="operative-card">
              <div className="operative-card__portrait" aria-hidden="true">
                <span>IC</span>
              </div>
              <div>
                <span className="data-label">Mercenary profile</span>
                <h3>Isabella Capet</h3>
                <p>{selectedClass.name} · Level 1 planning state</p>
              </div>
            </div>

            <div className="attribute-grid">
              {attributes.map((attribute) => (
                <div className="attribute" key={attribute.label}>
                  <span>{attribute.label}</span>
                  <strong>{attribute.value}</strong>
                  <small aria-label={`${attribute.delta} from modifiers`}>{attribute.delta}</small>
                </div>
              ))}
            </div>

            <div className="panel-section">
              <div className="panel-section__heading">
                <SectionLabel>Class perks</SectionLabel>
                <span>Verified inventory</span>
              </div>
              <PerkBrowser perks={selectedPerks} />
            </div>
          </section>

          <aside className="panel panel--results" aria-labelledby="results-title">
            <div className="panel-title-row">
              <div>
                <SectionLabel>Synthetic preview output</SectionLabel>
                <h2 id="results-title">Protection</h2>
              </div>
              <span className="result-count">04</span>
            </div>

            <div className="resistance-list">
              {resistances.map((resistance) => (
                <button className="resistance" key={resistance.label} type="button">
                  <span className="resistance__heading">
                    <span>{resistance.label}</span>
                    <strong>{resistance.value}</strong>
                  </span>
                  <span className="resistance__track" aria-hidden="true">
                    <span style={{ width: `${resistance.value}%` }} />
                  </span>
                  <span className="resistance__detail">
                    View breakdown <ChevronRight />
                  </span>
                </button>
              ))}
            </div>

            <div className="validation-summary">
              <AlertTriangle aria-hidden="true" />
              <div>
                <strong>2 planning notices</strong>
                <span>Backpack and secondary weapon are empty.</span>
              </div>
              <ChevronRight aria-hidden="true" />
            </div>

            <p className="result-footnote">
              Preview values do not respond to class selection. Verified calculations will show base
              values, modifier order, and source evidence in a later phase.
            </p>
          </aside>
        </div>
      </main>

      <footer>
        <span>Unofficial fan project</span>
        <span>Not affiliated with Quasimorph's developers or publishers</span>
        <a href="https://github.com/RookieOne/quasimorph">Source on GitHub</a>
      </footer>

      <ClassSelectionDialog
        classes={classPerkCatalog.classes}
        finalFocus={classButtonRef}
        onClose={closeClassDialog}
        onSelect={(classRecord) => {
          setSelectedClassId(classRecord.id);
          closeClassDialog();
        }}
        open={classDialogOpen}
        selectedClassId={selectedClassId}
      />
    </div>
  );
}
