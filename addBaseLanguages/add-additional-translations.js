const folder = process.argv[2];
const language = process.argv[3];
const fs = require('fs');
const file = fs.readFileSync('../projects/ngx-extended-pdf-viewer/' + folder + '/locale/locale.json');
const content = JSON.parse(file.toString());

processOneLanguage('en-us', 'en');
if (language) {
  const shortcode = language.substring(0, 2);
  processOneLanguage(language, shortcode);
} else {
  for (let lang of Object.keys(content)) {
    const shortcode = lang.substring(0, 2);

    processOneLanguage(lang, shortcode);
  }
}

function processOneLanguage(lang, shortcode) {
  const originalFilename = '../projects/ngx-extended-pdf-viewer/' + folder + '/locale/' + content[lang];
  let originalLines = fs.readFileSync(originalFilename).toString();
  let targetLang = originalLines;

  let additionalFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/' + shortcode + '.ftl';
  if (fs.existsSync(additionalFilename)) {
    const header = '\n# Additional translations for ngx-extended-pdf-viewer (' + shortcode + ')';
    targetLang = addTranslationsFromAFile(additionalFilename, targetLang, header);
  }

  const englishFilename = '../projects/ngx-extended-pdf-viewer/' + folder + '/locale/en-US/viewer.ftl';
  let header = '\n# Translations for ngx-extended-pdf-viewer additions only available in en-US';
  targetLang = addTranslationsFromAFile(englishFilename, targetLang, header);

  let additionalEnglishFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/en.ftl';

  header = '\n# Additional translations for ngx-extended-pdf-viewer - without ' + lang + ' translation';
  targetLang = addTranslationsFromAFile(additionalEnglishFilename, targetLang, header);

  if (folder === 'assets') {
    const futureTranslations = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
    header = '\n# Additional translations for ngx-extended-pdf-viewer from the ' + lang + ' bleeding edge branch';
    targetLang = addTranslationsFromAFile(futureTranslations, targetLang, header);
  }
  if (folder === 'assets') {
    const futureEnglishTranslations = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
    header = '\n# Additional translations for ngx-extended-pdf-viewer from the English bleeding edge branch';
    targetLang = addTranslationsFromAFile(futureEnglishTranslations, targetLang, header);
  }

  if (originalLines !== targetLang) {
    fs.writeFileSync(originalFilename, targetLang);
  }
}

function addTranslationsFromAFile(englishFilename, targetLang, header) {
  if (fs.existsSync(englishFilename)) {
    let english = fs.readFileSync(englishFilename).toString();
    const result = addMissingTranslations(targetLang, english);
    if (result.length > 0) {
      return targetLang + header + result;
    }
    return targetLang;
  }
  return targetLang;
}

function addMissingTranslations(targetLang, additionalLang) {
  let result = '';
  const lines = additionalLang.split('\n').filter((line) => !line.startsWith('#') && line.trim().length > 0);
  let add = false;
  for (line of lines) {
    if (line.includes('=') && !line.startsWith(' ')) {
      const key = line.substring(0, line.indexOf('=')).trim();
      add = !targetLang.includes(key);
    }
    if (add) {
      result = result + '\n' + line;
    }
  }
  return result;
}
