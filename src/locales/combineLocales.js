const walker = require('walk').walk('.');
const path = require('path');
const fs = require('fs');

const resources = {};

walker.on('file', (root, stat, next) => {
  const file = path.join(root, stat.name);
  if (file.match(/.json$/)) {
    const localeStr = fs.readFileSync(file).toString();
    const locale = JSON.parse(localeStr);
    resources[locale.language] = {};
    resources[locale.language].translation = locale.translation;
  }
  next();
});

walker.on('end', () => {
  fs.writeFileSync('./index.ts', toOutputStream(resources));
});

const toOutputStream = resources => {
  const head = `export default `;
  return head + JSON.stringify(resources);
};
