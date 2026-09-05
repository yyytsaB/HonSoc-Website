const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');

const preloadMatch = html.match(/<link rel="preload" [^>]*crest[^>]*>/);
const imgMatch = html.match(/<img [^>]*crest[^>]*>/);

const heroMatch = html.slice(html.indexOf('id="hero"')).match(/<img [^>]*>/);
console.log('Preload link:', preloadMatch ? preloadMatch[0] : 'NONE');
console.log('Img tag in #hero:', heroMatch ? heroMatch[0].slice(0, 160) : 'NONE');
