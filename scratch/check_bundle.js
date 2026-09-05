import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const html = fs.readFileSync(path.join('dist', 'index.html'), 'utf-8');

// Match component-url and renderer-url from astro-islands
const compUrls = [...html.matchAll(/component-url="([^"]+)"/g)].map(m => m[1]);
const rendererUrls = [...html.matchAll(/renderer-url="([^"]+)"/g)].map(m => m[1]);
const allIslandUrls = Array.from(new Set([...compUrls, ...rendererUrls]));

console.log('--- Astro Islands Loaded on Page ---');
let islandTotalRaw = 0;
let islandTotalGzip = 0;

for (const u of allIslandUrls) {
  const clean = u.replace(/^\//, '');
  const p = path.join('dist', clean);
  if (fs.existsSync(p)) {
    const buf = fs.readFileSync(p);
    const gz = zlib.gzipSync(buf).length;
    islandTotalRaw += buf.length;
    islandTotalGzip += gz;
    console.log(`- ${clean}: ${(buf.length / 1024).toFixed(2)} KB raw, ${(gz / 1024).toFixed(2)} KB gzip`);
  }
}

console.log(`\nIsland JS directly referenced: ${(islandTotalRaw / 1024).toFixed(2)} KB raw, ${(islandTotalGzip / 1024).toFixed(2)} KB gzip`);

// Also check all files in dist/_astro/
const astroDir = path.join('dist', '_astro');
const allAstroFiles = fs.readdirSync(astroDir).filter(f => f.endsWith('.js'));
let distTotalRaw = 0;
let distTotalGzip = 0;

console.log('\n--- All JS Chunks in dist/_astro/ ---');
for (const f of allAstroFiles) {
  const p = path.join(astroDir, f);
  const buf = fs.readFileSync(p);
  const gz = zlib.gzipSync(buf).length;
  distTotalRaw += buf.length;
  distTotalGzip += gz;
  console.log(`- ${f}: ${(buf.length / 1024).toFixed(2)} KB raw, ${(gz / 1024).toFixed(2)} KB gzip`);
}
console.log(`\nAll Chunks Combined: ${(distTotalRaw / 1024).toFixed(2)} KB raw, ${(distTotalGzip / 1024).toFixed(2)} KB gzip`);
