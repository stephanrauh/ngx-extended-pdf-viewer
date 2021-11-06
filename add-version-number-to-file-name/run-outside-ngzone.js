const fs = require('fs');

function addRunOutsideZone(folder="assets", file) {
  const f = `../projects/ngx-extended-pdf-viewer/${folder}/${file}`;
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f).toString().split("//# sourceMappingURL");
    const code = content[0];
    const start = "window.ngxZone.runOutsideAngular(() => {\n";
    const end = "\n});\n";
    fs.writeFileSync(f, start + code + end);
    console.log(f);
  }
}

addRunOutsideZone("assets", 'pdf.js');
addRunOutsideZone("assets", 'pdf.min.js');
addRunOutsideZone("assets", 'viewer.js');
addRunOutsideZone("assets", 'viewer.min.js');

addRunOutsideZone("assets", 'pdf-es5.js');
addRunOutsideZone("assets", 'pdf-es5.min.js');
addRunOutsideZone("assets", 'viewer-es5.js');
addRunOutsideZone("assets", 'viewer-es5.min.js');

addRunOutsideZone("bleeding-edge", 'pdf.js');
addRunOutsideZone("bleeding-edge", 'pdf.min.js');
addRunOutsideZone("bleeding-edge", 'viewer.js');
addRunOutsideZone("bleeding-edge", 'viewer.min.js');

addRunOutsideZone("bleeding-edge", 'pdf-es5.js');
addRunOutsideZone("bleeding-edge", 'pdf-es5.min.js');
addRunOutsideZone("bleeding-edge", 'viewer-es5.js');
addRunOutsideZone("bleeding-edge", 'viewer-es5.min.js');
