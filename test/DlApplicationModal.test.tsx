import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { DlApplicationModal } from '../src/components/interactive/DlApplicationModal';

describe('DlApplicationModal (TDD red-green loop)', () => {
  it('renders closed initially with an accessible trigger button', () => {
    render(<DlApplicationModal />);
    const trigger = screen.getByRole('button', { name: /open dean's list application/i });
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modal on trigger click and displays provisional criteria and structural guidelines', async () => {
    const user = userEvent.setup();
    render(<DlApplicationModal />);

    const trigger = screen.getByRole('button', { name: /open dean's list application/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Verify title
    expect(screen.getByRole('heading', { name: /dean's list application/i })).toBeInTheDocument();

    // Verify visible provisional criteria banner
    expect(screen.getByTestId('dl-provisional-banner')).toHaveTextContent(
      /provisional criteria/i
    );
    expect(screen.getByTestId('dl-provisional-banner')).toHaveTextContent(
      /pending confirmation from the dean's office/i
    );

    // Verify provisional calendar dates and QR placeholder
    expect(screen.getByText(/subject to registrar calendar/i)).toBeInTheDocument();
    expect(screen.getByAltText(/provisional google form qr placeholder/i)).toBeInTheDocument();

    // Verify anchor link to GWA calculator
    const calcLink = screen.getByRole('link', { name: /calculate your gwa/i });
    expect(calcLink).toBeInTheDocument();
    expect(calcLink).toHaveAttribute('href', '#gwa-calculator');
  });

  it('closes modal on Escape key press and returns focus to trigger button', async () => {
    const user = userEvent.setup();
    render(<DlApplicationModal />);

    const trigger = screen.getByRole('button', { name: /open dean's list application/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes modal on close button click and returns focus to trigger button', async () => {
    const user = userEvent.setup();
    render(<DlApplicationModal />);

    const trigger = screen.getByRole('button', { name: /open dean's list application/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    await user.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
