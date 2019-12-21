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

for (let lang in languages) {
  const shortcode = lang.substring(0, 2);
  const additionalFilename = '../projects/ngx-extended-pdf-viewer/src/assets/additional-locale/' + shortcode + '.properties';
  const originalFilename = '../projects/ngx-extended-pdf-viewer/src/assets/locale/' + lang + '/viewer.properties';
  if (fs.existsSync(additionalFilename) && fs.existsSync(originalFilename)) {
    const original = fs.readFileSync(originalFilename);
    const additional = fs.readFileSync(additionalFilename);
    if (original.includes(additional)) {
      console.log('The add-additional-translations script has already run for ' + lang);
    } else {
      const complete = original + '\n\n' + additional;
      console.log('Added custom translations to ' + lang);
      fs.writeFileSync(originalFilename, complete);
    }
  }
}
