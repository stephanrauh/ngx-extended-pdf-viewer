const fs = require('fs');
const file = fs.readFileSync('../projects/ngx-extended-pdf-viewer/src/assets/locale/locale.properties');
const content = file.toString().split('\n');

const languages = {};
for (let i = 0; i < content.length; i++) {
  const key = content[i];
  if (key.startsWith('[')) {
    const lang = key.substring(1, key.length - 1);
    languages[lang] = true;
  }
}

const result = [];
for (let i = 0; i < content.length; i++) {
  const key = content[i];
  if (key.startsWith('[')) {
    const lang = key.substring(1, key.length - 1);
    if (lang.includes('-')) {
      const base = lang.substr(0, lang.indexOf('-'));
      if (lang.toLowerCase() == base + '-' + base)
        if (!languages[base]) {
          languages[base] = true;
          result.push('[' + base + ']');
          result.push(content[i + 1]);
          result.push('');
          console.log('Added base language ' + base + ' derived from ' + lang);
        }
    }
  }
  result.push(key);
}

const result2 = [];
for (let i = 0; i < result.length; i++) {
  const key = result[i];
  if (key.startsWith('[')) {
    const lang = key.substring(1, key.length - 1);
    if (lang.includes('-')) {
      const base = lang.substr(0, lang.indexOf('-'));
      if (!languages[base]) {
        languages[base] = true;
        result2.push('[' + base + ']');
        result2.push(result[i + 1]);
        result2.push('');
        console.log('Added base language ' + base + ' derived from ' + lang);
      }
    }
  }
  result2.push(key);
}

fs.writeFileSync('../projects/ngx-extended-pdf-viewer/src/assets/locale/locale.properties', result2.join('\n'));
