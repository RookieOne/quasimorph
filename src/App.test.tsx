import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('application foundation', () => {
  it('introduces the calculator workspace', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Mercury Protocol' })).toBeInTheDocument();
    expect(screen.getByText('Synthetic preview output')).toBeInTheDocument();
  });

  it('labels verified inventory separately from preview calculations', () => {
    render(<App />);

    expect(screen.getByLabelText('Dataset coverage notice')).toHaveTextContent(
      'Verified game inventory',
    );
    expect(screen.getByLabelText('Dataset coverage notice')).toHaveTextContent(
      '1.0.3 · 1.0.3.578s.024ad60 · 14 classes / 79 perks',
    );
    expect(screen.getByText('Synthetic preview output')).toBeInTheDocument();
  });

  it('shows the initial class and its six ordered perks', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /Class Scouts of Hades/i })).toBeInTheDocument();
    expect(screen.getByText(/Scouts of Hades · Level 1 planning state/)).toBeInTheDocument();
    const perkList = screen.getByRole('list', { name: 'Selected class perks' });
    const perkRows = within(perkList).getAllByRole('listitem');
    expect(perkRows).toHaveLength(6);
    expect(perkRows[0]).toHaveTextContent('CQC-specialist');
    expect(perkRows[5]).toHaveTextContent('Assault Reflex');
    expect(screen.queryByText('Prototype Vanguard')).not.toBeInTheDocument();
  });

  it('filters and selects a verified class', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Class Scouts of Hades/i }));
    const search = screen.getByRole('searchbox', { name: 'Search classes' });
    fireEvent.change(search, { target: { value: 'angel' } });

    expect(screen.getByRole('button', { name: /Angels of Spades/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Scouts of Hades/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Angels of Spades/i }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Class Angels of Spades/i })).toBeInTheDocument();
    expect(screen.getByText(/Angels of Spades · Level 1 planning state/)).toBeInTheDocument();
    const perkList = screen.getByRole('list', { name: 'Selected class perks' });
    expect(within(perkList).getByText('Ghost Killer')).toBeInTheDocument();
  });

  it('preserves selection on an empty search and restores trigger focus on dismissal', async () => {
    render(<App />);

    const classButton = screen.getByRole('button', { name: /Class Scouts of Hades/i });
    fireEvent.click(classButton);
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search classes' }), {
      target: { value: 'not-a-class' },
    });

    expect(screen.getByText('No matching classes')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close class selection' }));

    await waitFor(() => expect(classButton).toHaveFocus());
    expect(screen.getByRole('button', { name: /Class Scouts of Hades/i })).toBeInTheDocument();
  });

  it('expands exact perk levels and source metadata', () => {
    render(<App />);

    const firstPerk = screen.getAllByRole('listitem')[0];
    fireEvent.click(within(firstPerk).getByText('CQC-specialist'));

    expect(within(firstPerk).getByText('cqc_specialist')).toBeInTheDocument();
    expect(within(firstPerk).getByText('ShotRangedWeapon')).toBeInTheDocument();
    expect(within(firstPerk).getByText('Smg, Shotgun, AssaultRifle')).toBeInTheDocument();
    expect(within(firstPerk).getByRole('heading', { name: 'basic' })).toBeInTheDocument();
    expect(within(firstPerk).getByRole('heading', { name: 'legend' })).toBeInTheDocument();
    expect(within(firstPerk).getByText('100 XP to next level')).toBeInTheDocument();
    expect(within(firstPerk).getByText('Maximum level')).toBeInTheDocument();
    expect(within(firstPerk).getAllByText('FScatter')).toHaveLength(4);
  });
});
