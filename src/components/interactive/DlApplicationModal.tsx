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
import { Award, AlertTriangle, Calculator, Calendar, FileText, ExternalLink } from 'lucide-react';

export interface DlApplicationModalProps {
  triggerText?: string;
  triggerVariant?: 'primary' | 'outline';
}

export const DlApplicationModal: React.FC<DlApplicationModalProps> = ({
  triggerText = "Open Dean's List Application",
  triggerVariant = 'primary',
}) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={triggerText}
          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-pill font-ui text-body-sm font-semibold transition-[color,background-color,border-color] duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            triggerVariant === 'primary'
              ? 'bg-maroon text-white hover:bg-maroon-hover'
              : 'border border-maroon text-maroon hover:bg-maroon-light'
          }`}
        >
          <Award className="h-4 w-4" aria-hidden="true" />
          {triggerText}
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-pill bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-label font-ui font-semibold text-amber-800 uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
              Provisional Guidelines
            </span>
          </div>
          <DialogTitle className="mt-1">Dean's List Application</DialogTitle>
          <DialogDescription className="mt-1">
            Collegiate honors qualification process and submission procedure.
          </DialogDescription>
        </DialogHeader>

        {/* Visible Provisional Criteria Banner */}
        <div
          data-testid="dl-provisional-banner"
          className="rounded-card border border-amber-200 bg-amber-50/90 p-4 text-amber-900 text-body-sm"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-ui font-semibold text-label uppercase tracking-wider block text-amber-950">
                Provisional Criteria Notice
              </span>
              <p className="mt-0.5 text-amber-850">
                Official qualification guidelines, minimum credit unit loads, and grade retention policies are currently under review, pending confirmation from the Dean's Office / Registrar.
              </p>
            </div>
          </div>
        </div>

        {/* Structural Preparation Guidelines */}
        <div className="space-y-3">
          <span className="text-label font-ui font-semibold text-stone-muted uppercase block">
            Applicant Preparation Steps
          </span>

          <div className="rounded-card border border-border bg-stone p-3 flex items-start gap-3 text-body-sm">
            <Calculator className="h-5 w-5 text-maroon flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-semibold text-gray-900 block">Estimate Semestral GWA</span>
              <span className="text-stone-muted">
                Use the on-page calculator to verify your weighted average across enrolled courses.
              </span>
            </div>
          </div>

          <div className="rounded-card border border-border bg-stone p-3 flex items-start gap-3 text-body-sm">
            <FileText className="h-5 w-5 text-maroon flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-semibold text-gray-900 block">Prepare Academic Documents</span>
              <span className="text-stone-muted">
                Secure an official or system-generated copy of your semestral grades and registration assessment.
              </span>
            </div>
          </div>

          <div className="rounded-card border border-border bg-stone p-3 flex items-start gap-3 text-body-sm">
            <Calendar className="h-5 w-5 text-maroon flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-semibold text-gray-900 block">Tentative Application Schedule</span>
              <span className="text-stone-muted">
                Term 1 Window: October 15 – October 30, 2026 [Provisional — Subject to Registrar Calendar].
              </span>
            </div>
          </div>
        </div>

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
            Honors Application Intake
          </span>
          <p className="text-body-sm text-stone-muted mt-1 max-w-xs mx-auto">
            The formal Google Form application portal will open immediately following the release of the Dean's Office memorandum.
          </p>
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-stone-200 text-stone-600 text-label cursor-not-allowed">
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Intake Portal Pending Activation
            </span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <a
            href="#gwa-calculator"
            onClick={handleLinkClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-pill border border-maroon text-maroon hover:bg-maroon-light font-ui text-body-sm font-semibold transition-[color,background-color] duration-120 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Calculate Your GWA
          </a>

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
