import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MobileNavDrawer } from '../src/components/navigation/MobileNavDrawer';

describe('MobileNavDrawer (TDD red-green loop)', () => {
  const navItems = [
    { label: 'Homepage', href: '#hero' },
    { label: 'Membership', href: '#membership' },
    { label: 'Officers', href: '#officers' },
    { label: 'Accomplishments', href: '#accomplishments' },
    { label: 'Merch', href: '#merch' },
    { label: 'DL Application', href: '#dl-application' },
    { label: 'Hall of Fame', href: '#hall-of-fame' },
  ];

  it('renders closed initially with an accessible trigger button', () => {
    render(<MobileNavDrawer items={navItems} />);
    const trigger = screen.getByRole('button', { name: /open navigation menu/i });
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens drawer on trigger click and displays navigation links', async () => {
    const user = userEvent.setup();
    render(<MobileNavDrawer items={navItems} />);

    const trigger = screen.getByRole('button', { name: /open navigation menu/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    for (const item of navItems) {
      expect(screen.getByRole('link', { name: item.label })).toBeInTheDocument();
    }
  });

  it('closes on Escape key press and returns focus to the trigger button', async () => {
    const user = userEvent.setup();
    render(<MobileNavDrawer items={navItems} />);

    const trigger = screen.getByRole('button', { name: /open navigation menu/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes on Close button click and returns focus to the trigger button', async () => {
    const user = userEvent.setup();
    render(<MobileNavDrawer items={navItems} />);

    const trigger = screen.getByRole('button', { name: /open navigation menu/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close navigation menu/i });
    await user.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
