const folder = process.argv[2];
const fs = require('fs');
const file = fs.readFileSync('../projects/ngx-extended-pdf-viewer/' + folder + '/locale/locale.properties');
const content = file.toString().split('\n');

const languages = {};

for (let i = 0; i < content.length; i++) {
  const key = content[i];
  if (key.startsWith('[')) {
    const lang = key.substring(1, key.length - 1);
    languages[lang] = true;
  }
}

for (let lang in languages) {
  const shortcode = lang.substring(0, 2);
  let additionalFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/' + shortcode + '.properties';

  const originalFilename = '../projects/ngx-extended-pdf-viewer/' + folder + '/locale/' + lang + '/viewer.properties';
  if (fs.existsSync(additionalFilename) && fs.existsSync(originalFilename)) {
    const originalLines = fs.readFileSync(originalFilename).toString().replace(' = ', '=');
    const additional = fs.readFileSync(additionalFilename).toString().replace(' = ', '=');
    if (originalLines.includes(additional)) {
      console.log('The add-additional-translations script has already run for ' + lang);
    } else {
      const additionalLines = additional.split('\n');
      let additions = extractMissingTranslations(additionalLines, originalLines);
      if (additions.length > 0) {
        const complete = originalLines + '\n\n# Translations for ngx-extended-pdf-viewer additions\n\n' + additions;
        fs.writeFileSync(originalFilename, complete);
      }
    }
  }
  additionalFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/en.properties';
  if (fs.existsSync(additionalFilename) && fs.existsSync(originalFilename)) {
    const originalLines = fs.readFileSync(originalFilename).toString().replace(' = ', '=');
    const additional = fs.readFileSync(additionalFilename).toString().replace(' = ', '=');
    if (originalLines.includes(additional)) {
      console.log('The add-additional-translations script has already run for ' + lang + ' (English)');
    } else {
      const additionalLines = additional.split('\n');
      let additions = extractMissingTranslations(additionalLines, originalLines);
      if (additions.length > 0) {
        const complete = originalLines + '\n\n# Translations for ngx-extended-pdf-viewer additions (falling back to English)\n\n' + additions;
        fs.writeFileSync(originalFilename, complete);
      }
    }
  }

  if (folder !== 'bleeding-edge' && folder !== '3.11') {
    const filename28 = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + lang + '/viewer.properties';
    if (filename28 != originalFilename && fs.existsSync(filename28) && fs.existsSync(originalFilename)) {
      const originalLines = fs.readFileSync(originalFilename).toString().replace(' = ', '=');
      const additionalLines = fs.readFileSync(filename28).toString().replace(' = ', '=').toString().split('\n');
      let additions = extractMissingTranslations(additionalLines, originalLines);

      if (additions.length > 0) {
        const complete = originalLines + '\n\n# Translations added from pdf.js@next\n\n' + additions;
        fs.writeFileSync(originalFilename, complete);
      }
    }
  }

  const filename28English = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/en-US/viewer.properties';
  if (fs.existsSync(originalFilename)) {
    const originalLines = fs.readFileSync(originalFilename).toString().replace(' = ', '=');
    const additionalLines = fs.readFileSync(filename28English).toString().replace(' = ', '=').toString().split('\n');
    let additions = '';

    for (const line of additionalLines) {
      if (line.trim().length > 0 && !line.startsWith('#')) {
        const pos = line.indexOf('=');
        const key = line.substring(0, pos).trim();
        if (!originalLines.includes(key + '=') && !originalLines.includes(key + ' =')) {
          additions += line + '\n';
        }
      }
    }

    if (additions.length > 0) {
      const complete = originalLines + '\n\n# Translations added from the English translations of pdf.js@next\n\n' + additions;
      fs.writeFileSync(originalFilename, complete);
    }
  }
}
function extractMissingTranslations(additionalLines, originalLines) {
  let additions = '';

  for (const line of additionalLines) {
    if (line.trim().length > 0 && !line.startsWith('#')) {
      const pos = line.indexOf('=');
      const key = line.substring(0, pos).trim();
      if (!originalLines.includes(key + '=') && !originalLines.includes(key + ' =')) {
        additions += line + '\n';
      }
    }
  }
  return additions;
}
