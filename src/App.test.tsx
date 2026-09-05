import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('application foundation', () => {
  it('introduces the calculator workspace', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Mercury Protocol' })).toBeInTheDocument();
    expect(screen.getByText('Calculated output')).toBeInTheDocument();
  });

  it('labels representative values as preview data', () => {
    render(<App />);

    expect(screen.getByLabelText('Dataset coverage notice')).toHaveTextContent(
      'Synthetic fill-ins validate the data model',
    );
    expect(screen.getByLabelText('Dataset coverage notice')).toHaveTextContent(
      '1.0.3 target · 2 classes / 4 perks',
    );
  });
});
