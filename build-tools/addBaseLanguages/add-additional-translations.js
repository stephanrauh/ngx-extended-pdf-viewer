const folder = process.argv[2];
const language = process.argv[3];
const fs = require('fs');
const file = fs.readFileSync('./projects/ngx-extended-pdf-viewer/' + folder + '/locale/locale.json');
const content = JSON.parse(file.toString());

const ADDITIONAL_LOCALE_DIR = './projects/ngx-extended-pdf-viewer/assets/additional-locale/';

// The set of languages ngx-extended-pdf-viewer supports is defined by the files in
// assets/additional-locale: drop a <language>.ftl in there and that language ships.
// The keys of locale.json are lowercase ("nb-no") while the files keep the canonical
// spelling ("nb-NO.ftl"), so the lookup has to be case-insensitive - matching on the
// raw name only works on a case-insensitive filesystem and breaks on Linux CI.
const ADDITIONAL_LOCALES = new Map(
  fs
    .readdirSync(ADDITIONAL_LOCALE_DIR)
    .filter((name) => name.endsWith('.ftl'))
    .map((name) => [name.slice(0, -'.ftl'.length).toLowerCase(), name.slice(0, -'.ftl'.length)]),
);

/**
 * Exact match first ("nb-no" -> "nb-NO.ftl"), then the two-letter shortcode ("de-de" -> "de.ftl").
 * The shortcode is only allowed to match a real region variant, i.e. "de" or "de-AT" - never
 * "skr" (Saraiki), which shares its first two letters with Slovak and would otherwise have been
 * served Slovak translations.
 */
function findAdditionalLocale(lang, shortcode) {
  const key = lang.toLowerCase();
  const exact = ADDITIONAL_LOCALES.get(key);
  if (exact) {
    return exact;
  }
  if (key === shortcode || key.startsWith(shortcode + '-')) {
    return ADDITIONAL_LOCALES.get(shortcode.toLowerCase());
  }
  return undefined;
}

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
  const originalFilename = './projects/ngx-extended-pdf-viewer/' + folder + '/locale/' + content[lang];
  let originalLines = fs.readFileSync(originalFilename).toString();
  let targetLang = originalLines;

  const additionalCode = findAdditionalLocale(lang, shortcode);
  if (additionalCode) {
    const header = '\n# Additional translations for ngx-extended-pdf-viewer (' + additionalCode + ')';
    targetLang = addTranslationsFromAFile(ADDITIONAL_LOCALE_DIR + additionalCode + '.ftl', targetLang, header);
  }

  const englishFilename = './projects/ngx-extended-pdf-viewer/' + folder + '/locale/en-US/viewer.ftl';
  let header = '\n# Translations for ngx-extended-pdf-viewer additions only available in en-US';
  targetLang = addTranslationsFromAFile(englishFilename, targetLang, header);

  let additionalEnglishFilename = './projects/ngx-extended-pdf-viewer/assets/additional-locale/en.ftl';

  header = '\n# Additional translations for ngx-extended-pdf-viewer - without ' + lang + ' translation';
  targetLang = addTranslationsFromAFile(additionalEnglishFilename, targetLang, header);

  if (folder === 'assets') {
    const futureTranslations = './projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
    header = '\n# Additional translations for ngx-extended-pdf-viewer from the ' + lang + ' bleeding edge branch';
    targetLang = addTranslationsFromAFile(futureTranslations, targetLang, header);
  }
  if (folder === 'assets') {
    const futureEnglishTranslations = './projects/ngx-extended-pdf-viewer/bleeding-edge/locale/' + content[lang];
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
