import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const astroDir = path.join('dist', '_astro');
const html = fs.readFileSync(path.join('dist', 'index.html'), 'utf-8');

// Find all entrypoints in html
const entrypoints = new Set();
for (const m of html.matchAll(/(?:src|href|component-url|renderer-url)="\/(_astro\/[^"]+\.js)"/g)) {
  entrypoints.add(m[1].replace('_astro/', ''));
}

console.log('Direct HTML entrypoints:', Array.from(entrypoints));

// Parse imports transitively
const visited = new Set();
function traceImports(file) {
  if (visited.has(file)) return;
  visited.add(file);

  const fullPath = path.join(astroDir, file);
  if (!fs.existsSync(fullPath)) return;

  const content = fs.readFileSync(fullPath, 'utf-8');
  // Match standard ES imports: from "./..." or import("./...")
  for (const m of content.matchAll(/(?:from\s*['"]\.\/([^'"]+)['"]|import\(['"]\.\/([^'"]+)['"]\))/g)) {
    const imported = m[1] || m[2];
    if (imported && imported.endsWith('.js')) {
      traceImports(imported);
    }
  }
}

for (const ep of entrypoints) {
  traceImports(ep);
}

console.log('\n--- Transitive JS Files Loaded for index.html ---');
let totalRaw = 0;
let totalGzip = 0;

for (const file of Array.from(visited).sort()) {
  const p = path.join(astroDir, file);
  const buf = fs.readFileSync(p);
  const gz = zlib.gzipSync(buf).length;
  totalRaw += buf.length;
  totalGzip += gz;
  console.log(`- ${file}: ${(buf.length / 1024).toFixed(2)} KB raw, ${(gz / 1024).toFixed(2)} KB gzip`);
}

console.log('-------------------------------------------------');
console.log(`Page Transitive JS: ${(totalRaw / 1024).toFixed(2)} KB raw, ${(totalGzip / 1024).toFixed(2)} KB gzip`);
console.log(`GWA Calculator Island alone: ${(fs.readFileSync(path.join(astroDir, Array.from(visited).find(f => f.startsWith('GwaCalculator')))).length / 1024).toFixed(2)} KB raw, ${(zlib.gzipSync(fs.readFileSync(path.join(astroDir, Array.from(visited).find(f => f.startsWith('GwaCalculator'))))).length / 1024).toFixed(2)} KB gzip`);
