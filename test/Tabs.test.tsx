import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../src/components/ui/tabs';

describe('Section Toggle Tabs primitive', () => {
  it('renders tabs with active pill state and switches tabs instantly on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="homepage">
        <TabsList>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="officers">Officers</TabsTrigger>
        </TabsList>
        <TabsContent value="homepage">Homepage Section Content</TabsContent>
        <TabsContent value="membership">Membership Section Content</TabsContent>
        <TabsContent value="officers">Officers Section Content</TabsContent>
      </Tabs>
    );

    const homepageTab = screen.getByRole('tab', { name: 'Homepage' });
    const membershipTab = screen.getByRole('tab', { name: 'Membership' });

    expect(homepageTab).toHaveAttribute('data-state', 'active');
    expect(membershipTab).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByText('Homepage Section Content')).toBeInTheDocument();
    expect(screen.queryByText('Membership Section Content')).not.toBeInTheDocument();

    await user.click(membershipTab);

    expect(membershipTab).toHaveAttribute('data-state', 'active');
    expect(homepageTab).toHaveAttribute('data-state', 'inactive');
    expect(screen.getByText('Membership Section Content')).toBeInTheDocument();
    expect(screen.queryByText('Homepage Section Content')).not.toBeInTheDocument();
  });
});
