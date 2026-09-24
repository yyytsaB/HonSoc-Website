import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, GraduationCap, AlertTriangle, Calculator, Award } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon?: 'graduation' | 'alert' | 'calculator' | 'award';
}

const defaultFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: "What is the minimum academic load required to qualify for Dean's List honors?",
    answer: "A regular full-time academic load of at least fifteen (15.0) academic units during the evaluated regular semester is strictly required. Graduating students in their terminal semester carrying fewer than 15 units as prescribed by their approved curriculum may qualify upon formal certification issued by the College Secretary.",
    icon: 'graduation',
  },
  {
    id: 'faq-2',
    question: "Can an Incomplete (INC) or 4.00 (Conditional) grade be resolved to qualify?",
    answer: "No. Under Batangas State University academic regulations, any grade of Incomplete (INC), 4.00 (Conditional), or 5.00 (Failed) incurred during the semester of evaluation renders the student disqualified for Dean's List honors, regardless of subsequent removal or completion.",
    icon: 'alert',
  },
  {
    id: 'faq-3',
    question: "Are NSTP, Physical Education (PATHFit), or Midyear subjects factored into the GWA?",
    answer: "Academic evaluation strictly follows university guidelines: NSTP grades represent non-academic civic units and are excluded from GWA computation. PATHFit courses are credit-bearing academic courses and are factored into the semestral GWA. Midyear terms are evaluated separately and do not confer regular semestral Dean's List honors.",
    icon: 'calculator',
  },
  {
    id: 'faq-4',
    question: "How and when do honorees receive their official Certificates of Academic Excellence?",
    answer: "Following verification by the Committee on Records and the College Secretary, official parchment certificates and honors pins are conferred during the semi-annual College of Arts and Sciences Honors Convocation and Pinning Ceremony. Certified digital copies are also accessible through the student portal.",
    icon: 'award',
  },
];

export interface FaqAccordionProps {
  items?: FaqItem[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items = defaultFaqs,
  className = '',
}) => {
  const renderIcon = (icon?: string) => {
    switch (icon) {
      case 'graduation':
        return <GraduationCap className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />;
      case 'calculator':
        return <Calculator className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />;
      case 'award':
      default:
        return <Award className="h-4 w-4 text-gold flex-shrink-0" aria-hidden="true" />;
    }
  };

  return (
    <Accordion.Root
      type="single"
      collapsible
      className={`space-y-3 font-body ${className}`}
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="rounded-card border border-border bg-surface overflow-hidden shadow-sm transition-[border-color] duration-120 ease-enter"
        >
          <Accordion.Header className="m-0 p-0">
            <Accordion.Trigger className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 text-body-sm font-ui font-semibold text-gray-900 hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold group transition-colors duration-120 ease-enter">
              <span className="flex items-center gap-3">
                {renderIcon(item.icon)}
                <span>{item.question}</span>
              </span>
              <ChevronDown
                className="h-4 w-4 text-gray-400 group-hover:text-maroon group-data-[state=open]:rotate-180 transition-transform duration-120 ease-enter flex-shrink-0"
                aria-hidden="true"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-4 sm:px-5 pb-5 pt-1 text-body-sm text-gray-600 border-t border-border/60 bg-stone/40 leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default FaqAccordion;
