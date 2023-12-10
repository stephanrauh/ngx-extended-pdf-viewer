const folder = process.argv[2];
const fs = require('fs');
const file = fs.readFileSync('../projects/ngx-extended-pdf-viewer/' + folder + '/locale/locale.json');
const content = JSON.parse(file.toString());

for (let lang of Object.keys(content)) {
  const shortcode = lang.substring(0, 2);
  let additionalFilename = '../projects/ngx-extended-pdf-viewer/assets/additional-locale/' + shortcode + '.ftl';

  const originalFilename = '../projects/ngx-extended-pdf-viewer/' + folder + '/locale/' + content[lang];
  if (fs.existsSync(additionalFilename) && fs.existsSync(originalFilename)) {
    const originalLines = fs.readFileSync(originalFilename).toString();
    const additional = fs.readFileSync(additionalFilename).toString();
    if (originalLines.includes(additional)) {
      console.log('The add-additional-translations script has already run for ' + lang);
    } else {
      const complete = originalLines + '\n\n# Translations for ngx-extended-pdf-viewer additions\n\n' + additional;
      fs.writeFileSync(originalFilename, complete);
    }
  }
}
