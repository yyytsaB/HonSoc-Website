export interface HallOfFameItem {
  id?: string;
  year: number;
  semester?: '1st' | '2nd';
  name: string;
  program: string;
  category: "Dean's Lister" | 'Topnotcher';
  rank?: number;
}

export function filterHallOfFame(
  items: HallOfFameItem[],
  selectedCategory: string,
  selectedYear: string
): HallOfFameItem[] {
  const normCat = selectedCategory.toLowerCase().trim();
  const normYr = selectedYear.toLowerCase().trim();

  return items.filter((item) => {
    let matchesCategory = true;
    if (normCat !== 'all') {
      const itemCatSlug = item.category.toLowerCase().replace(/[']/g, '').replace(/[\s-]+/g, '-');
      matchesCategory = itemCatSlug === normCat || item.category.toLowerCase() === normCat;
    }

    let matchesYear = true;
    if (normYr !== 'all') {
      matchesYear = String(item.year) === normYr;
    }

    return matchesCategory && matchesYear;
  });
}

export function applyDomFilter(
  container: HTMLElement,
  selectedCategory: string,
  selectedYear: string
): number {
  const cards = container.querySelectorAll<HTMLElement>('[data-hof-card]');
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardCat = card.getAttribute('data-category') || '';
    const cardYear = card.getAttribute('data-year') || '';

    const matchCat = selectedCategory === 'all' || cardCat === selectedCategory;
    const matchYear = selectedYear === 'all' || cardYear === selectedYear;

    if (matchCat && matchYear) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const emptyState = container.querySelector<HTMLElement>('[data-hof-empty]');
  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  return visibleCount;
}
