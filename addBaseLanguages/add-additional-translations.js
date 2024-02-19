const folder = process.argv[2];
const fs = require('fs');
const file = fs.readFileSync('../projects/ngx-extended-pdf-viewer/' + folder + '/locale/locale.json');
const content = JSON.parse(file.toString());

processOneLanguage('en-us', 'en');
for (let lang of Object.keys(content)) {
  const shortcode = lang.substring(0, 2);

  processOneLanguage(lang, shortcode);
}

function processOneLanguage(lang, shortcode) {
  const originalFilename = '../projects/ngx-extended-pdf-viewer/' + folder + '/locale/' + content[lang];
  let originalLines = fs.readFileSync(originalFilename).toString();
  let targetLang = originalLines;

  if (folder === 'assets') {
    const futureTranslations = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
    targetLang = addTranslationsFromAFile(futureTranslations, targetLang);
  }

  const englishFilename = '../projects/ngx-extended-pdf-viewer/' + folder + '/locale/en-US/viewer.ftl';
  targetLang = addTranslationsFromAFile(englishFilename, targetLang);

  if (folder === 'assets') {
    const futureEnglishTranslations = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
    targetLang = addTranslationsFromAFile(futureEnglishTranslations, targetLang);
  }

  let additionalFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/' + shortcode + '.ftl';
  if (fs.existsSync(additionalFilename)) {
    targetLang = targetLang + '\n\n# Translations for ngx-extended-pdf-viewer additions\n\n';
    targetLang = addTranslationsFromAFile(additionalFilename, targetLang);
  }

  let additionalEnglishFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/en.ftl';
  targetLang = addTranslationsFromAFile(additionalEnglishFilename, targetLang);

  if (originalLines !== targetLang) {
    fs.writeFileSync(originalFilename, targetLang);
  }
}

function addTranslationsFromAFile(englishFilename, targetLang) {
  if (fs.existsSync(englishFilename)) {
    let english = fs.readFileSync(englishFilename).toString();
    targetLang = addMissingTranslations(targetLang, english);
  }
  return targetLang;
}

function addMissingTranslations(targetLang, additionalLang) {
  const lines = additionalLang.split('\n').filter((line) => !line.startsWith('#') && line.trim().length > 0);
  let add = false;
  for (line of lines) {
    if (line.includes('=') && !line.startsWith(' ')) {
      const key = line.substring(0, line.indexOf('=')).trim();
      add = !targetLang.includes(key);
    }
    if (add) {
      targetLang = targetLang + '\n' + line;
    }
  }
  return targetLang;
}
