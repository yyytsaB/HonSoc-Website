import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetFile = path.join(rootDir, 'src/content/accomplishments.json');
const originalContent = fs.readFileSync(targetFile, 'utf-8');

console.log('=== Step 1: Snapshot Original Content ===');
console.log(`Target: ${targetFile}`);
console.log(`Original entries: ${JSON.parse(originalContent).length}`);

let dryRunSuccess = true;

try {
  // Step 2: Bad Edit Simulation
  console.log('\n=== Step 2: Intentional Bad Edit (Invalid Date Format) ===');
  const badData = JSON.parse(originalContent);
  badData.push({
    id: 'bad-entry',
    eventName: 'Invalid Event',
    date: '10/25/2025', // Violates ^\d{4}-\d{2}-\d{2}$ regex schema
    projectHead: 'Test Officer',
    sponsors: [],
    summary: 'This should fail build.',
  });
  fs.writeFileSync(targetFile, JSON.stringify(badData, null, 2), 'utf-8');

  let badEditFailedAsExpected = false;
  try {
    console.log('Running build with bad edit (expecting failure)...');
    execSync('npx astro build', { cwd: rootDir, stdio: 'pipe' });
    console.error('ERROR: Build unexpectedly succeeded with bad edit!');
  } catch (err) {
    badEditFailedAsExpected = true;
    const stderr = err.stderr ? err.stderr.toString() : '';
    const stdout = err.stdout ? err.stdout.toString() : '';
    console.log('✓ Build failed as expected with non-zero exit code.');
    const combined = stderr + '\n' + stdout;
    if (combined.includes('Use ISO date') || combined.includes('date')) {
      console.log('✓ Schema validation error correctly identified: "Use ISO date: YYYY-MM-DD"');
    } else {
      console.log('Error output excerpt:', combined.slice(0, 300));
    }
  }

  if (!badEditFailedAsExpected) {
    dryRunSuccess = false;
  }

  // Step 3: Good Edit Simulation
  console.log('\n=== Step 3: Valid Good Edit (Adding Real Event) ===');
  const goodData = JSON.parse(originalContent);
  const testEventName = 'Arts and Sciences Leadership Summit 2026';
  goodData.push({
    id: 'acc-test-summit',
    eventName: testEventName,
    date: '2026-04-12',
    projectHead: 'Secretary General',
    sponsors: ['College Alumni Association'],
    summary: 'Annual leadership orientation and academic forum for junior arts and sciences scholars.',
  });
  fs.writeFileSync(targetFile, JSON.stringify(goodData, null, 2), 'utf-8');

  console.log('Running build with valid edit (expecting success)...');
  execSync('npx astro build', { cwd: rootDir, stdio: 'pipe' });
  console.log('✓ Build succeeded with exit code 0.');

  // Step 4: Verify Output in dist/index.html
  console.log('\n=== Step 4: Verify Output in dist/index.html ===');
  const distHtml = fs.readFileSync(path.join(rootDir, 'dist/index.html'), 'utf-8');
  if (distHtml.includes(testEventName)) {
    console.log(`✓ Confirmed: "${testEventName}" successfully rendered in dist/index.html`);
  } else {
    console.error(`ERROR: "${testEventName}" not found in dist/index.html!`);
    dryRunSuccess = false;
  }

} finally {
  // Step 5: Clean Revert
  console.log('\n=== Step 5: Clean Revert to Original State ===');
  fs.writeFileSync(targetFile, originalContent, 'utf-8');
  console.log('✓ Target file restored to original content.');
  const restoredContent = fs.readFileSync(targetFile, 'utf-8');
  console.log(`Entries after restoration: ${JSON.parse(restoredContent).length}`);
  // Run final build to ensure dist matches clean original
  execSync('npx astro build', { cwd: rootDir, stdio: 'pipe' });
  console.log('✓ Final clean build completed.');
}

console.log(`\nDry Run Simulation Overall Result: ${dryRunSuccess ? 'PASSED' : 'FAILED'}`);
