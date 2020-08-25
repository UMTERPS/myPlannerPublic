const walker = require('walk').walk('.');
const path = require('path');
const fs = require('fs');
const {
  themeVariableTemplate,
  styleSheetTemplate
} = require('./themeTemplate');

let defs = '';
let styles = '';

function generateThemeVars(configs) {
  let result = themeVariableTemplate.replace(/<<themeName>>/g, configs.theme);
  Object.keys(configs.values).forEach(key => {
    result = result.replace(`<<${key}>>`, configs.values[key]);
  });
  return result;
}

function generateStyleSheet(configs) {
  let result = styleSheetTemplate.replace(
    /<<themeClassName>>/,
    configs.theme === 'default' ? '' : `.${configs.theme}`
  );
  result = result.replace(/<<themeName>>/g, configs.theme);
  return result;
}

walker.on('file', (root, stat, next) => {
  const file = path.join(root, stat.name);
  if (file.match(/.json$/)) {
    const themeData = JSON.parse(fs.readFileSync(file).toString());
    defs += generateThemeVars(themeData);
    styles += generateStyleSheet(themeData);
  }
  next();
});

walker.on('end', () => {
  fs.writeFileSync('./theme.less', defs + styles);
});
