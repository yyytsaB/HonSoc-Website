import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export interface SectionTabsProps {
  defaultTab?: string;
}

export const SectionTabsIsland: React.FC<SectionTabsProps> = ({
  defaultTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const sections = [
    { id: 'overview', label: 'Overview', tag: 'Start Here', summary: 'HonSoc mission, announcements, and key society updates.' },
    { id: 'membership', label: 'Membership', tag: '₱ Semestral', summary: 'Transparent semestral dues breakdown and student funding allocations.' },
    { id: 'officers', label: 'Officers', tag: 'Directory', summary: 'Executive board, committees, faculty advisers, and college leadership.' },
    { id: 'accomplishments', label: 'Accomplishments', tag: 'Archive', summary: 'Academic seminars, community outreach, and project head archives.' },
    { id: 'merch', label: 'Merch', tag: 'Store', summary: 'Official society apparel, jackets, shirts, and size guides.' },
    { id: 'dl-application', label: 'DL Application', tag: 'Open Dates', summary: 'Dean\'s List eligibility guidelines, requirements, and Google Form submission.' },
    { id: 'hall-of-fame', label: 'Hall of Fame', tag: 'Honors', summary: 'Dean\'s Listers and professional board examination topnotchers.' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Horizontal scroll container for smaller viewports */}
        <div className="overflow-x-auto pb-2 scrollbar-none flex justify-center">
          <TabsList className="flex flex-wrap sm:flex-nowrap justify-start sm:justify-center p-1.5 rounded-pill bg-surface/80 backdrop-blur-md border border-border shadow-card">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="text-body-sm font-ui font-semibold rounded-pill px-4 py-2 transition-[color,background-color,box-shadow] duration-[120ms] ease-enter data-[state=active]:bg-maroon data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {sections.map((section) => (
          <TabsContent
            key={section.id}
            value={section.id}
            className="rounded-card bg-surface/90 backdrop-blur-sm border border-border p-6 shadow-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-4">
              <div>
                <span className="text-label font-ui font-semibold text-gold-accessible uppercase tracking-wider">
                  {section.tag}
                </span>
                <h3 className="text-h3 font-heading text-gray-900 mt-1">{section.label}</h3>
              </div>
              <a
                href={`#${section.id}`}
                className="inline-flex items-center text-body-sm font-ui font-semibold text-maroon hover:underline"
              >
                Jump to full section &rarr;
              </a>
            </div>
            <p className="text-body text-gray-600 font-body max-w-prose">
              {section.summary}
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SectionTabsIsland;
