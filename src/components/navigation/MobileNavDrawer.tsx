import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex items-center justify-center p-2 rounded-pill text-gray-700 hover:text-maroon hover:bg-maroon-light transition-[color,background-color] duration-[120ms] ease-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 md:hidden"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[85vh] p-6">
        <DrawerHeader className="flex items-center justify-between p-0 mb-6 border-b border-border pb-4 text-left">
          <div>
            <DrawerTitle className="text-h3 font-heading text-maroon">Navigation</DrawerTitle>
            <DrawerDescription className="text-body-sm text-gray-500 font-body">
              Select a section to explore
            </DrawerDescription>
          </div>
          <DrawerClose asChild>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="p-2 rounded-pill text-gray-500 hover:text-gray-900 hover:bg-stone transition-[color,background-color] duration-[120ms] ease-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <nav aria-label="Mobile Navigation" className="flex flex-col gap-2 pb-6">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-3 rounded-pill text-body font-ui font-semibold text-gray-800 hover:bg-maroon-light hover:text-maroon transition-[color,background-color] duration-[120ms] ease-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNavDrawer;
