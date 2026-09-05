import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import {
  filterHallOfFame,
  applyDomFilter,
  type HallOfFameItem,
} from '../src/lib/hall-of-fame-filter';

describe('Hall of Fame Filtering & DOM Verification (TDD)', () => {
  const sampleItems: HallOfFameItem[] = [
    {
      id: 'hof-1',
      year: 2025,
      semester: '1st',
      name: "[Pending Dean's Office List] Honors Candidate 1",
      program: 'BS Computer Science',
      category: "Dean's Lister",
    },
    {
      id: 'hof-2',
      year: 2025,
      name: '[Pending Archival List] Topnotcher Candidate 1',
      program: 'BS Mathematics',
      category: 'Topnotcher',
      rank: 1,
    },
    {
      id: 'hof-3',
      year: 2024,
      semester: '2nd',
      name: "[Pending Dean's Office List] Honors Candidate 2",
      program: 'BS Applied Mathematics',
      category: "Dean's Lister",
    },
    {
      id: 'hof-4',
      year: 2023,
      name: '[Pending Archival List] Topnotcher Candidate 3',
      program: 'BS Computer Science',
      category: 'Topnotcher',
      rank: 5,
    },
  ];

  describe('filterHallOfFame pure logic', () => {
    it('returns all items when category and year are "all"', () => {
      const result = filterHallOfFame(sampleItems, 'all', 'all');
      expect(result).toHaveLength(4);
    });

    it('filters correctly by category', () => {
      const deansListers = filterHallOfFame(sampleItems, 'deans-lister', 'all');
      expect(deansListers).toHaveLength(2);
      expect(deansListers.every((i) => i.category === "Dean's Lister")).toBe(true);

      const topnotchers = filterHallOfFame(sampleItems, 'topnotcher', 'all');
      expect(topnotchers).toHaveLength(2);
      expect(topnotchers.every((i) => i.category === 'Topnotcher')).toBe(true);
    });

    it('filters correctly by academic year', () => {
      const items2025 = filterHallOfFame(sampleItems, 'all', '2025');
      expect(items2025).toHaveLength(2);

      const items2023 = filterHallOfFame(sampleItems, 'all', '2023');
      expect(items2023).toHaveLength(1);
      expect(items2023[0].name).toContain('Topnotcher Candidate 3');
    });

    it('returns empty array when combined filter yields 0 matches', () => {
      const result = filterHallOfFame(sampleItems, 'topnotcher', '2022');
      expect(result).toHaveLength(0);
    });
  });

  describe('DOM Filtering & Provisional UI Assertions', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      document.body.innerHTML = '';
      container = document.createElement('div');
      container.innerHTML = `
        <div data-testid="hof-provisional-banner" class="provisional-banner">
          <span>Archival Records Notice</span>
          <p>Historical rosters are currently undergoing collegiate archive reconciliation.</p>
        </div>

        <div class="filter-toolbar">
          <button data-cat-btn="all" aria-pressed="true">All</button>
          <button data-cat-btn="deans-lister" aria-pressed="false">Dean's Lister</button>
          <button data-cat-btn="topnotcher" aria-pressed="false">Topnotcher</button>
          
          <button data-yr-btn="all" aria-pressed="true">All Years</button>
          <button data-yr-btn="2025" aria-pressed="false">2025</button>
          <button data-yr-btn="2024" aria-pressed="false">2024</button>
          <button data-yr-btn="2023" aria-pressed="false">2023</button>
        </div>

        <div id="hof-grid">
          <article data-hof-card data-category="deans-lister" data-year="2025">
            <span class="badge">Dean's Lister</span>
            <h3>[Pending Dean's Office List] Honors Candidate 1</h3>
            <p>BS Computer Science</p>
          </article>
          <article data-hof-card data-category="topnotcher" data-year="2025">
            <span class="badge">Topnotcher</span>
            <span class="rank-tag">[Provisional Rank 1]</span>
            <h3>[Pending Archival List] Topnotcher Candidate 1</h3>
            <p>BS Mathematics</p>
          </article>
          <article data-hof-card data-category="deans-lister" data-year="2024">
            <span class="badge">Dean's Lister</span>
            <h3>[Pending Dean's Office List] Honors Candidate 2</h3>
            <p>BS Applied Mathematics</p>
          </article>
        </div>

        <div data-testid="hof-empty-state" data-hof-empty style="display: none;">
          <p>No honors records found matching the selected filter criteria.</p>
        </div>
      `;
      document.body.appendChild(container);
    });

    it('asserts provisional archival notice banner renders in DOM with expected text', () => {
      const banner = screen.getByTestId('hof-provisional-banner');
      expect(banner).toBeInTheDocument();
      expect(banner).toHaveTextContent(/archival records notice/i);
      expect(banner).toHaveTextContent(/archive reconciliation/i);
    });

    it('asserts candidate names AND ranks are both explicitly marked provisional in DOM', () => {
      const deansPending = screen.getAllByText(/\[pending dean's office list\]/i);
      expect(deansPending.length).toBeGreaterThan(0);
      expect(screen.getByText(/\[pending archival list\]/i)).toBeInTheDocument();
      expect(screen.getByText(/\[provisional rank 1\]/i)).toBeInTheDocument();
    });

    it('filters cards by category in DOM when Topnotcher filter is applied', () => {
      const visible = applyDomFilter(container, 'topnotcher', 'all');
      expect(visible).toBe(1);

      const cards = container.querySelectorAll<HTMLElement>('[data-hof-card]');
      expect(cards[0].style.display).toBe('none'); // deans-lister
      expect(cards[1].style.display).toBe('');     // topnotcher
      expect(cards[2].style.display).toBe('none'); // deans-lister
      expect(screen.getByTestId('hof-empty-state')).not.toBeVisible();
    });

    it('displays empty state when filter criteria matches zero records', () => {
      const visible = applyDomFilter(container, 'topnotcher', '2024');
      expect(visible).toBe(0);

      const emptyState = screen.getByTestId('hof-empty-state');
      expect(emptyState.style.display).toBe('block');
      expect(emptyState).toHaveTextContent(/no honors records found/i);
    });
  });
});
