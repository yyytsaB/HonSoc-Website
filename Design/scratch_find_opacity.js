const fs = require('fs');
const content = fs.readFileSync('background.html', 'utf8');
const lines = content.split(/\r?\n/);
lines.forEach((l, idx) => {
  if (/(text-\w+-\d+\/(80|90|95)|text-white\/(80|90|95))/.test(l)) {
    console.log(`Line ${idx + 1}: ${l.trim()}`);
  }
});
