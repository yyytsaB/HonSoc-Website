import { describe, it, expect, beforeEach } from 'vitest';
import {
  switchRecognitionTab,
  filterAchieversList,
  filterDistinctionsList,
  TOP_ACHIEVERS_DATA,
  OTHER_DISTINCTIONS_DATA,
} from '../src/lib/academic-recognition';

describe('Academic Recognition Tabs & Filters Logic (TDD)', () => {
  describe('switchRecognitionTab DOM switching', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      document.body.innerHTML = '';
      container = document.createElement('div');
      container.innerHTML = `
        <div role="tablist">
          <button id="tab-deans-list" class="recognition-tab" aria-selected="true">Dean's Listers</button>
          <button id="tab-achievers" class="recognition-tab" aria-selected="false">Top Achievers</button>
          <button id="tab-distinctions" class="recognition-tab" aria-selected="false">Other Distinctions</button>
        </div>
        <div id="panel-deans-list" class="recognition-panel block">Dean's List Content</div>
        <div id="panel-achievers" class="recognition-panel hidden">Achievers Content</div>
        <div id="panel-distinctions" class="recognition-panel hidden">Distinctions Content</div>
      `;
      document.body.appendChild(container);
    });

    it('switches active tab to achievers and toggles visibility of corresponding panel', () => {
      switchRecognitionTab('achievers', container);

      const deansTab = container.querySelector('#tab-deans-list');
      const achieversTab = container.querySelector('#tab-achievers');
      const deansPanel = container.querySelector('#panel-deans-list');
      const achieversPanel = container.querySelector('#panel-achievers');

      expect(achieversTab?.getAttribute('aria-selected')).toBe('true');
      expect(deansTab?.getAttribute('aria-selected')).toBe('false');
      expect(achieversTab?.classList.contains('bg-primary')).toBe(true);

      expect(achieversPanel?.classList.contains('block')).toBe(true);
      expect(achieversPanel?.classList.contains('hidden')).toBe(false);
      expect(deansPanel?.classList.contains('hidden')).toBe(true);
    });

    it('switches active tab to distinctions and toggles visibility of corresponding panel', () => {
      switchRecognitionTab('distinctions', container);

      const distinctionsTab = container.querySelector('#tab-distinctions');
      const distinctionsPanel = container.querySelector('#panel-distinctions');
      const achieversPanel = container.querySelector('#panel-achievers');

      expect(distinctionsTab?.getAttribute('aria-selected')).toBe('true');
      expect(distinctionsPanel?.classList.contains('block')).toBe(true);
      expect(distinctionsPanel?.classList.contains('hidden')).toBe(false);
      expect(achieversPanel?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('filterAchieversList', () => {
    it('returns all achievers when program is "all" and query is empty', () => {
      const results = filterAchieversList(TOP_ACHIEVERS_DATA, 'all', '');
      expect(results.length).toBe(TOP_ACHIEVERS_DATA.length);
      expect(results.length).toBeGreaterThanOrEqual(9);
    });

    it('filters achievers by programCode', () => {
      const bioResults = filterAchieversList(TOP_ACHIEVERS_DATA, 'bio', '');
      expect(bioResults.length).toBeGreaterThan(0);
      expect(bioResults.every((item) => item.programCode === 'bio')).toBe(true);
    });

    it('filters achievers by search query (name or rank)', () => {
      const queryResults = filterAchieversList(TOP_ACHIEVERS_DATA, 'all', 'Valedictorian');
      expect(queryResults.length).toBe(1);
      expect(queryResults[0].name).toContain('MERCADO');
    });
  });

  describe('filterDistinctionsList', () => {
    it('returns all distinctions when category is "all" and query is empty', () => {
      const results = filterDistinctionsList(OTHER_DISTINCTIONS_DATA, 'all', '');
      expect(results.length).toBe(OTHER_DISTINCTIONS_DATA.length);
      expect(results.length).toBeGreaterThanOrEqual(9);
    });

    it('filters distinctions by category', () => {
      const researchResults = filterDistinctionsList(OTHER_DISTINCTIONS_DATA, 'research', '');
      expect(researchResults.length).toBe(3);
      expect(researchResults.every((item) => item.category === 'research')).toBe(true);

      const leadershipResults = filterDistinctionsList(OTHER_DISTINCTIONS_DATA, 'leadership', '');
      expect(leadershipResults.length).toBe(2);
      expect(leadershipResults.every((item) => item.category === 'leadership')).toBe(true);
    });

    it('filters distinctions by search query', () => {
      const searchResults = filterDistinctionsList(OTHER_DISTINCTIONS_DATA, 'all', 'Olympiad');
      expect(searchResults.length).toBe(1);
      expect(searchResults[0].recipients).toContain('Adrian Ramos');
    });
  });
});
