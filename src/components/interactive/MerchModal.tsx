import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ShoppingBag, AlertTriangle, ExternalLink } from 'lucide-react';

export interface MerchColor {
  label: string;
  hex: string;
}

export interface MerchItem {
  id?: string;
  name: string;
  description?: string;
  price: number;
  sizes: string[];
  colors: MerchColor[];
  images: string[];
  available?: boolean;
}

const defaultMerchItem: MerchItem = {
  id: 'varsity-jacket',
  name: 'CAS Varsity Jacket',
  description: 'Heavyweight collegiate varsity jacket with embroidered gold chest crest and striped ribbing.',
  price: 650,
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
  colors: [
    { label: 'Maroon', hex: '#8B1E1E' },
    { label: 'Gold', hex: '#EAA838' },
  ],
  images: ['/merch/jacket-front.webp'],
  available: true,
};

export interface MerchModalProps {
  item?: MerchItem;
  triggerText?: string;
  triggerVariant?: 'primary' | 'outline';
}

export const MerchModal: React.FC<MerchModalProps> = ({
  item = defaultMerchItem,
  triggerText = 'Pre-order Item',
  triggerVariant = 'primary',
}) => {
  const currentItem = item || defaultMerchItem;
  const [selectedSize, setSelectedSize] = useState<string>(currentItem.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(currentItem.colors?.[0]?.label || '');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={triggerText}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-pill bg-maroon text-white hover:bg-maroon-hover font-ui text-body-sm font-semibold transition-[color,background-color] duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {triggerText}
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-pill bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-label font-ui font-semibold text-amber-800 uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
              Draft Mockup
            </span>
          </div>
          <DialogTitle className="mt-1">{currentItem.name}</DialogTitle>
          {currentItem.description && (
            <DialogDescription className="mt-1">{currentItem.description}</DialogDescription>
          )}
        </DialogHeader>

        {/* Pricing Notice */}
        <div className="rounded-card border border-border bg-stone p-3 text-body-sm">
          <div className="font-ui font-bold text-maroon text-body-lg">
            Estimated Target: ₱{currentItem.price}
          </div>
          <p className="text-stone-muted text-label mt-0.5">
            Subject to Executive Committee Approval — non-commercial demonstration figure.
          </p>
        </div>

        {/* Color Variants */}
        {currentItem.colors && currentItem.colors.length > 0 && (
          <div>
            <label className="text-label font-ui font-semibold text-stone-muted uppercase block mb-2">
              Color Option: <span className="text-gray-900 normal-case">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {currentItem.colors.map((color) => {
                const isSelected = selectedColor === color.label;
                return (
                  <button
                    key={color.label}
                    type="button"
                    aria-label={`Color ${color.label}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedColor(color.label)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-body-sm transition-[border-color,background-color] duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      isSelected
                        ? 'border-maroon bg-maroon-light font-semibold text-maroon'
                        : 'border-border bg-white text-gray-700 hover:bg-stone'
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-black/20"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    {color.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {currentItem.sizes && currentItem.sizes.length > 0 && (
          <div>
            <label className="text-label font-ui font-semibold text-stone-muted uppercase block mb-2">
              Size Selection: <span className="text-gray-900 normal-case">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {currentItem.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    aria-label={`Size ${size}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[2.5rem] px-3 py-1.5 rounded-pill border text-body-sm text-center transition-[border-color,background-color] duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      isSelected
                        ? 'border-maroon bg-maroon text-white font-semibold'
                        : 'border-border bg-white text-gray-700 hover:bg-stone'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QR Code & Form Placeholder */}
        <div className="rounded-card border border-dashed border-border bg-stone p-4 text-center">
          <div className="mx-auto w-36 h-36 flex items-center justify-center bg-white p-2 rounded-card border border-border">
            <img
              src="/images/qr-placeholder.svg"
              alt="Provisional Google Form QR placeholder"
              width="130"
              height="130"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-label font-ui font-semibold text-maroon block mt-3 uppercase tracking-wider">
            Pre-Order Form Link
          </span>
          <p className="text-body-sm text-stone-muted mt-1 max-w-xs mx-auto">
            Scan QR or access the pre-order intake form once officially activated by the Merch Committee.
          </p>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-stone-200 text-stone-600 text-label cursor-not-allowed">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Intake Form Pending Activation
            </span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 rounded-pill border border-border bg-white text-gray-700 hover:bg-stone text-body-sm font-semibold transition-[color,background-color] duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MerchModal;
