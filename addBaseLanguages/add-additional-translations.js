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

  let additionalFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/' + shortcode + '.ftl';
  if (fs.existsSync(additionalFilename)) {
    const additional = fs.readFileSync(additionalFilename).toString();
    if (originalLines.includes(additional)) {
      // console.log('The add-additional-translations script has already run for ' + lang);
    } else {
      originalLines = originalLines + '\n\n# Translations for ngx-extended-pdf-viewer additions\n\n' + additional;
    }
  }

  if (folder === 'assets') {
    const futureTranslations = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
    targetLang = addTranslationsFromAFile(futureTranslations, targetLang);
  }

  const englishFilename = '../projects/ngx-extended-pdf-viewer/' + folder + '/locale/en-US/viewer.ftl';
  console.log(englishFilename);
  targetLang = addTranslationsFromAFile(englishFilename, targetLang);

  if (originalLines !== targetLang) {
    console.log('Writing ' + originalFilename);
    fs.writeFileSync(originalFilename, targetLang);
  }

  if (folder === 'assets') {
    const futureEnglishTranslations = '../projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
    targetLang = addTranslationsFromAFile(futureEnglishTranslations, targetLang);
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
  const lines = additionalLang.split('\n').filter(line => !line.startsWith('#') && line.trim().length > 0);
  let add = false;
  for (line of lines) {
    if (line.includes('=') && !line.startsWith(" ")) {
      const key = line.substring(0, line.indexOf('=')).trim();
      add = !targetLang.includes(key);
    }
    if (add) {
      console.log("Adding " + line);
      targetLang = targetLang + '\n' + line;
    } else {
      console.log("Skipping " + line);
    }
  }
  return targetLang
}
