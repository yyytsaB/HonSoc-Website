import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('CASHONSITE Architectural Pages & Layout Integrity', () => {
  const pagesDir = path.resolve(__dirname, '../src/pages');
  const expectedPages = [
    'index.astro',
    'about.astro',
    'transparency.astro',
    'activities.astro',
    'academic-recognition.astro',
    'request.astro',
    'feedback.astro',
    '404.astro',
  ];

  it('contains exactly the 8 expected CASHONSITE revised mockup pages', () => {
    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro'));
    expect(files.sort()).toEqual(expectedPages.sort());
  });

  it('ensures each page imports BaseLayout, Navbar, and Footer', () => {
    for (const page of expectedPages) {
      const content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
      expect(content).toContain('BaseLayout');
      expect(content).toContain('Navbar');
      expect(content).toContain('Footer');
    }
  });

  it('ensures zero external googleusercontent images remain in pages', () => {
    for (const page of expectedPages) {
      const content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
      expect(content).not.toContain('lh3.googleusercontent.com');
    }
  });

  it('ensures 404 page contains proper archival error code and recovery links', () => {
    const content = fs.readFileSync(path.join(pagesDir, '404.astro'), 'utf-8');
    expect(content).toContain('Registry Code 404');
    expect(content).toContain('Index Query Fault');
    expect(content).toContain('href="/"');
    expect(content).toContain('href="/transparency"');
    expect(content).toContain('href="/request"');
    expect(content).toContain('href="/academic-recognition"');
    expect(content).toContain('href="/feedback"');
  });

  it('ensures all placeholder SVGs exist in public/images', () => {
    const imagesDir = path.resolve(__dirname, '../public/images');
    const requiredSVGs = [
      'officer-placeholder.svg',
      'stole-placeholder.svg',
      'activity-convention.svg',
      'activity-outreach.svg',
      'activity-convocation.svg',
    ];
    for (const svg of requiredSVGs) {
      expect(fs.existsSync(path.join(imagesDir, svg))).toBe(true);
    }
  });

  it('ensures all self-hosted Newsreader and Montserrat font files exist in public/fonts', () => {
    const fontsDir = path.resolve(__dirname, '../public/fonts');
    const requiredFonts = [
      'newsreader-latin-400-normal.woff2',
      'newsreader-latin-500-normal.woff2',
      'newsreader-latin-600-normal.woff2',
      'montserrat-latin-400-normal.woff2',
      'montserrat-latin-600-normal.woff2',
      'montserrat-latin-700-normal.woff2',
    ];
    for (const font of requiredFonts) {
      expect(fs.existsSync(path.join(fontsDir, font))).toBe(true);
    }
  });
});
