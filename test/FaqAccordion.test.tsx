import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { FaqAccordion } from '../src/components/interactive/FaqAccordion';

describe('FaqAccordion Component', () => {
  it('renders all questions and toggles answers on click with proper accessibility attributes', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion />);

    const firstQuestion = screen.getByRole('button', {
      name: /minimum academic load/i,
    });
    expect(firstQuestion).toBeInTheDocument();
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');

    await user.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/at least fifteen \(15\.0\) academic units/i)).toBeInTheDocument();
  });
});
