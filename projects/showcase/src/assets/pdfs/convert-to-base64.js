const fs = require('fs');

function base64_encode(file) {
    const bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    const bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
}

const base64str = base64_encode('./Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf');
// console.log(base64str);

const result = `export const pdfBase64 = '${base64str}';`
fs.writeFileSync("../../../src/app/extended-pdf-viewer/base64/pdfBase64.ts", result);
