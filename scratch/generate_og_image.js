import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4A0E0E"/>
        <stop offset="50%" stop-color="#8B1E1E"/>
        <stop offset="100%" stop-color="#2D0606"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#EAA838"/>
        <stop offset="100%" stop-color="#F5C065"/>
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    
    <!-- Outer Border -->
    <rect x="32" y="32" width="${width - 64}" height="${height - 64}" rx="20" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.75"/>
    <rect x="44" y="44" width="${width - 88}" height="${height - 88}" rx="14" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.15"/>
    
    <!-- Academic Decorative Laurel / Shield Icon -->
    <g transform="translate(600, 190)" text-anchor="middle">
      <circle cx="0" cy="0" r="54" fill="#EAA838" opacity="0.15"/>
      <circle cx="0" cy="0" r="44" fill="#8B1E1E" stroke="#EAA838" stroke-width="2"/>
      <text x="0" y="14" font-family="serif" font-size="42" font-weight="bold" fill="#EAA838" text-anchor="middle">H</text>
    </g>

    <!-- Main Title -->
    <text x="600" y="320" font-family="serif" font-size="68" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
      HONOR SOCIETY
    </text>

    <!-- Gold Accent Line -->
    <rect x="480" y="348" width="240" height="3" rx="1.5" fill="url(#gold)"/>

    <!-- Subtitle / College -->
    <text x="600" y="400" font-family="sans-serif" font-size="28" font-weight="600" fill="#EAA838" text-anchor="middle" letter-spacing="4">
      COLLEGE OF ARTS AND SCIENCES
    </text>

    <!-- Description -->
    <text x="600" y="460" font-family="sans-serif" font-size="22" font-weight="400" fill="#E2E8F0" text-anchor="middle" opacity="0.9">
      Academic Excellence • Student Transparency • Leadership
    </text>

    <!-- Footer URL -->
    <text x="600" y="540" font-family="sans-serif" font-size="18" font-weight="500" fill="#94A3B8" text-anchor="middle" letter-spacing="1">
      honsoc.org
    </text>
  </svg>
  `;

  const outputPath = path.resolve(__dirname, '../public/og-default.png');
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log('og-default.png generated at:', outputPath);
}

generateOgImage().catch(console.error);
