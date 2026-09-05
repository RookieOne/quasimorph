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
      'Values shown here are representative only',
    );
  });
});
