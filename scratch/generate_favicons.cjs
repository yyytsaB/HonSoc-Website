const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function makeFavicons() {
  const crestPath = path.resolve('src/assets/crest.png');
  
  // 128x128 PNG buffer for SVG embedding
  const buf128 = await sharp(crestPath)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // favicon.ico (32x32 PNG)
  await sharp(crestPath)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.resolve('public/favicon.ico'));

  // favicon.svg embedding 128x128 base64
  const b64 = buf128.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <image href="data:image/png;base64,${b64}" width="128" height="128" />
</svg>
`;
  fs.writeFileSync(path.resolve('public/favicon.svg'), svg, 'utf-8');

  console.log('Favicons generated successfully from official crest.');
}

makeFavicons().catch(console.error);
