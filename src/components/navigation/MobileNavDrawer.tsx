import React, { useState } from 'react';
import { Menu, X, Award, Calculator } from 'lucide-react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';

export interface NavItem {
  label: string;
  href: string;
}

export interface MobileNavDrawerProps {
  items: NavItem[];
  currentPath?: string;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  items,
  currentPath = '/',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex items-center justify-center p-2 rounded-pill text-gray-700 hover:text-maroon hover:bg-maroon-light transition-[color,background-color] duration-[120ms] ease-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 lg:hidden"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[85vh] p-6">
        <DrawerHeader className="flex items-center justify-between p-0 mb-6 border-b border-border pb-4 text-left">
          <div>
            <DrawerTitle className="text-h3 font-heading text-maroon font-normal">Navigation</DrawerTitle>
            <DrawerDescription className="text-body-sm text-stone-muted font-body">
              Select a section or collegiate service
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="p-2 rounded-pill text-stone-muted hover:text-gray-900 hover:bg-stone transition-[color,background-color] duration-[120ms] ease-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <nav aria-label="Mobile Navigation" className="flex flex-col gap-1 pb-4">
          {items.map((item) => {
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center px-4 py-3 rounded-lg text-body-md font-ui transition-[color,background-color] duration-[120ms] ease-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant font-semibold hover:bg-surface-container hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-outline-variant/30 flex flex-col gap-2.5">
          <a
            href="/request"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-surface-container font-ui text-body-sm font-semibold text-on-surface hover:bg-surface-bright transition-colors duration-120 ease-enter"
          >
            <span>Document Request Portal</span>
          </a>
          <a
            href="/feedback"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-ui text-body-sm font-semibold hover:bg-primary/90 transition-colors duration-120 ease-enter"
          >
            <span>Send Feedback &amp; Inquiries</span>
          </a>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavDrawer;
