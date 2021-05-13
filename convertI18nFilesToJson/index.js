const folder = process.argv[2];
var fs = require('fs');

function convertLanguage(language) {
  var PropertiesReader = require('properties-reader');
  var properties = PropertiesReader(`../projects/ngx-extended-pdf-viewer/${folder}/locale/${language}/viewer.properties`);
  console.log(`${language} has ${properties.length} translations.`);
  const result = {};
  properties.each(x => {
    const dot = x.indexOf('.');
    if (dot >= 0) {
      section = x.substring(0, dot);
      entry = x.substring(dot + 1);
      let s = result[section];
      if (!s) {
        result[section] = {};
        s = result[section];
      }
      s[entry] = properties.get(x);
    } else {
      result[x] = { textContent: properties.get(x) };
    }
  });
  fs.writeFileSync(
    '../projects/ngx-extended-pdf-viewer/' + folder + '/inline-locale-files/' + language + '.html',
    `<script type="application/l10n">{"default_locale":"${language}","locales":{"${language}":${JSON.stringify(result)}}}\n</script>`
  );
}

const dir = fs.readdirSync('../projects/ngx-extended-pdf-viewer/' + folder + '/locale');
dir.forEach(language => {
  if (language !== 'locale.properties' && language !== '.DS_Store') {
    convertLanguage(language);
  }
});
