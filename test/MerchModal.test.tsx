import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MerchModal, type MerchItem } from '../src/components/interactive/MerchModal';

describe('MerchModal (TDD red-green loop)', () => {
  const sampleItem: MerchItem = {
    id: 'fleece-jacket',
    name: '[Provisional] Chapter Fleece Jacket',
    description: 'Heavyweight collegiate zip fleece with embroidered crest.',
    price: 950,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { label: 'Maroon', hex: '#8B1E1E' },
      { label: 'Stone', hex: '#FAFAF9' },
    ],
    images: ['/images/merch-placeholder.svg'],
    available: true,
  };

  it('renders closed initially with trigger button', () => {
    render(<MerchModal item={sampleItem} />);
    const trigger = screen.getByRole('button', { name: /pre-order item/i });
    expect(trigger).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens modal on trigger click and displays provisional merchandise details', async () => {
    const user = userEvent.setup();
    render(<MerchModal item={sampleItem} />);

    const trigger = screen.getByRole('button', { name: /pre-order item/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Verify title and item description
    expect(screen.getByRole('heading', { name: /\[provisional\] chapter fleece jacket/i })).toBeInTheDocument();
    expect(screen.getByText(/heavyweight collegiate zip fleece/i)).toBeInTheDocument();

    // Verify provisional pricing and placeholder notices render explicitly
    expect(screen.getByText(/estimated target: ₱950/i)).toBeInTheDocument();
    expect(screen.getByText(/subject to executive committee approval/i)).toBeInTheDocument();
    expect(screen.getByAltText(/provisional google form qr placeholder/i)).toBeInTheDocument();
  });

  it('closes modal on Escape key and returns focus to trigger button', async () => {
    const user = userEvent.setup();
    render(<MerchModal item={sampleItem} />);

    const trigger = screen.getByRole('button', { name: /pre-order item/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes modal on close button click and returns focus to trigger button', async () => {
    const user = userEvent.setup();
    render(<MerchModal item={sampleItem} />);

    const trigger = screen.getByRole('button', { name: /pre-order item/i });
    await user.click(trigger);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    await user.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('allows selecting sizes and colors interactively in the modal', async () => {
    const user = userEvent.setup();
    render(<MerchModal item={sampleItem} />);

    const trigger = screen.getByRole('button', { name: /pre-order item/i });
    await user.click(trigger);

    const sizeM = screen.getByRole('button', { name: /size m/i });
    await user.click(sizeM);
    expect(sizeM).toHaveAttribute('aria-pressed', 'true');

    const colorStone = screen.getByRole('button', { name: /color stone/i });
    await user.click(colorStone);
    expect(colorStone).toHaveAttribute('aria-pressed', 'true');
  });
});
