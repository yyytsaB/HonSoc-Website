export interface AchieverItem {
  id: string;
  name: string;
  gwa: string;
  program: string;
  programCode: string;
  yearLevel: string;
  rankTitle: string;
  honorBadge: string;
  isPodium?: boolean;
  podiumRank?: 1 | 2 | 3;
  citation?: string;
}

export interface DistinctionItem {
  id: string;
  title: string;
  category: 'research' | 'leadership' | 'competitions' | 'citations';
  categoryLabel: string;
  award: string;
  recipients: string;
  program: string;
  programCode: string;
  adviserOrAffiliation?: string;
  citation: string;
  badge: string;
  icon: string;
}

export const TOP_ACHIEVERS_DATA: AchieverItem[] = [
  // College-Wide Podium (Top 3 across CAS)
  {
    id: 'achiever-1',
    name: 'ISABELLA F. MERCADO',
    gwa: '1.140',
    program: 'Bachelor of Science in Psychology',
    programCode: 'psych',
    yearLevel: '4th Year Graduating Senior',
    rankTitle: 'Rank 1 — College Valedictorian Candidate',
    honorBadge: 'Summa Cum Laude Track',
    isPodium: true,
    podiumRank: 1,
    citation: 'Consistent University Scholar across seven consecutive semesters. Lead investigator in collegiate Cognitive Neurobiology research with zero grades below 1.25.',
  },
  {
    id: 'achiever-2',
    name: 'JUANA PATRICIA L. DELA ROSA',
    gwa: '1.152',
    program: 'Bachelor of Science in Biology',
    programCode: 'bio',
    yearLevel: '4th Year Graduating Senior',
    rankTitle: 'Rank 2 — College Salutatorian Candidate',
    honorBadge: 'Summa Cum Laude Track',
    isPodium: true,
    podiumRank: 2,
    citation: 'Distinguished researcher in Cellular Genetics & Freshwater Ecology. Awarded highest thesis colloquium commendation in the Department of Biological Sciences.',
  },
  {
    id: 'achiever-3',
    name: 'PATRICIA MAE Y. TIU',
    gwa: '1.170',
    program: 'Bachelor of Science in Mathematics',
    programCode: 'math',
    yearLevel: '4th Year Graduating Senior',
    rankTitle: 'Rank 3 — First Honorable Mention',
    honorBadge: 'Magna Cum Laude Track',
    isPodium: true,
    podiumRank: 3,
    citation: 'Lead medalist in Regional Quantitative Mathematical Olympiad. Co-author of applied predictive hydrodynamic models for riverine risk mitigation.',
  },

  // Departmental First Rankers
  {
    id: 'achiever-4',
    name: 'MARIE CLAIRE D. ADELINA',
    gwa: '1.180',
    program: 'Bachelor of Science in Psychology',
    programCode: 'psych',
    yearLevel: '3rd Year Junior Scholar',
    rankTitle: 'Departmental Rank 1 — BS Psychology',
    honorBadge: 'High Academic Distinction',
    citation: 'Exemplary academic rating in Psychometrics and Experimental Psychology laboratories.',
  },
  {
    id: 'achiever-5',
    name: 'ERIKA SHANE D. MANALO',
    gwa: '1.190',
    program: 'Bachelor of Science in Biology',
    programCode: 'bio',
    yearLevel: '3rd Year Junior Scholar',
    rankTitle: 'Departmental Rank 1 — BS Biology',
    honorBadge: 'High Academic Distinction',
    citation: 'Consistently holds top-ranking GPA in Botany, Organic Chemistry, and Vertebrate Anatomy.',
  },
  {
    id: 'achiever-6',
    name: 'SOPHIA ANNE T. BAUTISTA',
    gwa: '1.210',
    program: 'Bachelor of Science in Mathematics',
    programCode: 'math',
    yearLevel: '3rd Year Junior Scholar',
    rankTitle: 'Departmental Rank 1 — BS Mathematics',
    honorBadge: 'High Academic Distinction',
    citation: 'Top standing in Advanced Abstract Algebra, Topology, and Numerical Analysis.',
  },
  {
    id: 'achiever-7',
    name: 'ALEXA MARIE B. DOMINGO',
    gwa: '1.220',
    program: 'Bachelor of Science in Chemistry',
    programCode: 'chem',
    yearLevel: '3rd Year Junior Scholar',
    rankTitle: 'Departmental Rank 1 — BS Chemistry',
    honorBadge: 'High Academic Distinction',
    citation: 'Highest quantitative grade rating in Analytical Chemistry Instrumentation & Organic Synthesis.',
  },
  {
    id: 'achiever-8',
    name: 'MARIA ANGELICA P. REYES',
    gwa: '1.230',
    program: 'BS Development Communication',
    programCode: 'devcom',
    yearLevel: '3rd Year Junior Scholar',
    rankTitle: 'Departmental Rank 1 — BS DevCom',
    honorBadge: 'High Academic Distinction',
    citation: 'Lead scholar in Community Media Campaigns and Participatory Development Communication.',
  },
  {
    id: 'achiever-9',
    name: 'MIKAELA R. AGUILAR',
    gwa: '1.250',
    program: 'BA English Language Studies',
    programCode: 'baels',
    yearLevel: '3rd Year Junior Scholar',
    rankTitle: 'Departmental Rank 1 — BAELS',
    honorBadge: 'High Academic Distinction',
    citation: 'Outstanding portfolio in Applied Sociolinguistics, Discourse Analysis, and Academic Stylistics.',
  },
];

export const OTHER_DISTINCTIONS_DATA: DistinctionItem[] = [
  // Research & Thesis
  {
    id: 'dist-1',
    category: 'research',
    categoryLabel: 'Research & Thesis',
    title: 'Taal Lake Microplastic Bioaccumulation Assessment',
    award: 'Best Undergraduate Thesis in Natural Sciences',
    recipients: 'Juan Carlos Santos, Beatrice Lim, Marco Reyes',
    program: 'BS Biology',
    programCode: 'bio',
    adviserOrAffiliation: 'Adviser: Dr. Jonelyn B. Sandoval',
    citation: 'Awarded highest honors during the 2026 College Research Colloquium for pioneering water quality ecotoxicology research.',
    badge: 'Gold Research Seal',
    icon: 'biotechnology',
  },
  {
    id: 'dist-2',
    category: 'research',
    categoryLabel: 'Research & Thesis',
    title: 'Socio-Emotional Resilience & Digital Fatigue Dynamics',
    award: 'Outstanding Empirical Research in Behavioral Sciences',
    recipients: 'Carmela Gomez, Rafael Villanueva, Alyssa Tan',
    program: 'BS Psychology',
    programCode: 'psych',
    adviserOrAffiliation: 'Adviser: Prof. Ma. Teresa Hernandez',
    citation: 'Commended for robust structural equation modeling and significant baseline recommendations for university wellness programs.',
    badge: 'Gold Research Seal',
    icon: 'psychology',
  },
  {
    id: 'dist-3',
    category: 'research',
    categoryLabel: 'Research & Thesis',
    title: 'Automated Hydrodynamic Flood Risk Mitigation Modeling',
    award: 'Excellence in Applied Mathematical Modeling',
    recipients: 'Gabriel David, Kevin Cruz',
    program: 'BS Mathematics',
    programCode: 'math',
    adviserOrAffiliation: 'Adviser: Engr. Ronald Castillo',
    citation: 'Developed an algorithmic predictive flood simulation tool recognized by municipal disaster risk reduction councils.',
    badge: 'Gold Research Seal',
    icon: 'calculate',
  },

  // Academic Leadership
  {
    id: 'dist-4',
    category: 'leadership',
    categoryLabel: 'Academic Leadership',
    title: 'Peer-Mentorship Tutorial & Scholastic Governance',
    award: 'Presidential Award for Academic Governance Leadership',
    recipients: 'Lian Beatrice S. Catipon',
    program: 'BS Psychology (Society President)',
    programCode: 'psych',
    adviserOrAffiliation: 'CAS Honor Society Executive Board',
    citation: 'Conferred for institutionalizing college-wide peer tutorials, transparency registries, and student scholastic advocacy programs.',
    badge: 'Presidential Medal',
    icon: 'military_tech',
  },
  {
    id: 'dist-5',
    category: 'leadership',
    categoryLabel: 'Academic Leadership',
    title: 'Collegiate Laboratory Biosafety & Disaster Protocol',
    award: 'Exemplary Civic Stewardship & Risk Reduction Citation',
    recipients: 'Geoeff Andrei Gutierrez',
    program: 'BS Biology (CDRRM Committee Head)',
    programCode: 'bio',
    adviserOrAffiliation: 'Disaster Risk Reduction Committee',
    citation: 'Pioneered modernized lab biosecurity standard operating procedures and campus-wide disaster readiness trainings.',
    badge: 'Stewardship Medal',
    icon: 'shield_with_heart',
  },

  // Competitions
  {
    id: 'dist-6',
    category: 'competitions',
    categoryLabel: 'Competitions',
    title: 'Regional Inter-University Mathematics Olympiad 2026',
    award: '1st Place Regional Champions',
    recipients: 'Adrian Ramos, Sigrid Idea, John Paul Alvarez',
    program: 'BS Mathematics',
    programCode: 'math',
    adviserOrAffiliation: 'Region IV-A Math Consortium',
    citation: 'Clinched the championship trophy against 24 universities across Southern Tagalog in rapid mathematical proof solving.',
    badge: 'Championship Trophy',
    icon: 'trophy',
  },
  {
    id: 'dist-7',
    category: 'competitions',
    categoryLabel: 'Competitions',
    title: '32nd Philippine Biodiversity Scientific Congress',
    award: 'National Finalists & Best Poster Presentation',
    recipients: 'Hans Valenton, Juana Patricia Dela Rosa',
    program: 'BS Biology',
    programCode: 'bio',
    adviserOrAffiliation: 'Philippine Biodiversity Society',
    citation: 'Honored on the national stage for documented field taxonomy and indigenous flora preservation methodology.',
    badge: 'National Finalist',
    icon: 'eco',
  },
  {
    id: 'dist-8',
    category: 'competitions',
    categoryLabel: 'Competitions',
    title: 'All-Luzon Parliamentary Inter-Collegiate Debate Cup',
    award: 'National Semi-Finalists & Top Institutional Debater',
    recipients: 'Laurence Danielle Catapang, Cristal Coliat',
    program: 'BA English Language Studies',
    programCode: 'baels',
    adviserOrAffiliation: 'Luzon Debate Union',
    citation: 'Recognized for oratorical excellence defending policy motions on academic freedom and equitable higher education access.',
    badge: 'Debate Laureate',
    icon: 'record_voice_over',
  },

  // Departmental Citations
  {
    id: 'dist-9',
    category: 'citations',
    categoryLabel: 'Departmental Citations',
    title: 'Clinical Psychiatric Internship Practicum Excellence',
    award: 'Highest Practicum Performance Commendation',
    recipients: 'Jennylyn M. Canino',
    program: 'BS Psychology',
    programCode: 'psych',
    adviserOrAffiliation: 'Department of Psychology Practicum Board',
    citation: 'Received unanimous 1.0 evaluations across all hospital psychiatric ward rotations and psychoeducational assessments.',
    badge: 'Faculty Commendation',
    icon: 'workspace_premium',
  },
];

export function switchRecognitionTab(
  targetTab: 'deans-list' | 'achievers' | 'distinctions',
  container: Document | HTMLElement = document
) {
  const tabs = container.querySelectorAll<HTMLButtonElement>('.recognition-tab');
  const panels = container.querySelectorAll<HTMLElement>('.recognition-panel');

  tabs.forEach((tab) => {
    const isTarget = tab.id === `tab-${targetTab}`;
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    if (isTarget) {
      tab.classList.remove('text-on-surface-variant');
      tab.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
    } else {
      tab.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      tab.classList.add('text-on-surface-variant');
    }
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === `panel-${targetTab}`;
    if (isTarget) {
      panel.classList.remove('hidden');
      panel.classList.add('block');
    } else {
      panel.classList.remove('block');
      panel.classList.add('hidden');
    }
  });
}

export function filterAchieversList(
  items: AchieverItem[],
  programCode: string,
  query: string
): AchieverItem[] {
  const cleanQuery = query.toLowerCase().trim();
  return items.filter((item) => {
    const matchesProgram = programCode === 'all' || item.programCode === programCode;
    const matchesQuery =
      cleanQuery === '' ||
      item.name.toLowerCase().includes(cleanQuery) ||
      item.program.toLowerCase().includes(cleanQuery) ||
      item.rankTitle.toLowerCase().includes(cleanQuery);
    return matchesProgram && matchesQuery;
  });
}

export function filterDistinctionsList(
  items: DistinctionItem[],
  category: string,
  query: string
): DistinctionItem[] {
  const cleanQuery = query.toLowerCase().trim();
  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesQuery =
      cleanQuery === '' ||
      item.title.toLowerCase().includes(cleanQuery) ||
      item.award.toLowerCase().includes(cleanQuery) ||
      item.recipients.toLowerCase().includes(cleanQuery) ||
      item.program.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesQuery;
  });
}
