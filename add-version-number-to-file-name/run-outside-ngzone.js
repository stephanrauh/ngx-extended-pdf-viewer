const fs = require('fs');

function addRunOutsideZone(folder = 'assets', file) {
  const f = `../projects/ngx-extended-pdf-viewer/${folder}/${file}`;
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f).toString().split('//# sourceMappingURL');
    // #1427 allow for AMD modules
    const code = content[0]
      .replace(`module.exports = factory();`, `root["pdfjs-dist/build/pdf"] = module.exports = factory();`)
      .replace(`module.exports=`, `globalThis["pdfjs-dist/build/pdf"]=module.exports=`)
      .replace(`exports["pdfjs-dist/build/pdf"] = factory();`, `root["pdfjs-dist/build/pdf"] = exports["pdfjs-dist/build/pdf"] = factory();`)
      .replace(`exports["pdfjs-dist/build/pdf"]=`, `globalThis["pdfjs-dist/build/pdf"]=exports["pdfjs-dist/build/pdf"]=`)
      .replace(
        `define("pdfjs-dist/build/pdf", [], factory);`,
        `{\n		define("pdfjs-dist/build/pdf", [], factory);\n	  	root["pdfjs-dist/build/pdf"] = root.pdfjsLib = factory();\n		}`
      )
      .replace(`define("pdfjs-dist/build/pdf",[],e)`, `(globalThis["pdfjs-dist/build/pdf"]=globalThis.pdfjsLib=e()||define("pdfjs-dist/build/pdf",[],e))`);
    // end of #1427

    fs.writeFileSync(f, start + code + end);
  }
}

addRunOutsideZone('assets', 'pdf.js');
addRunOutsideZone('assets', 'pdf.min.js');
addRunOutsideZone('assets', 'viewer.js');
addRunOutsideZone('assets', 'viewer.min.js');

addRunOutsideZone('assets', 'pdf-es5.js');
addRunOutsideZone('assets', 'pdf-es5.min.js');
addRunOutsideZone('assets', 'viewer-es5.js');
addRunOutsideZone('assets', 'viewer-es5.min.js');

addRunOutsideZone('bleeding-edge', 'pdf.js');
addRunOutsideZone('bleeding-edge', 'pdf.min.js');
addRunOutsideZone('bleeding-edge', 'viewer.js');
addRunOutsideZone('bleeding-edge', 'viewer.min.js');

addRunOutsideZone('bleeding-edge', 'pdf-es5.js');
addRunOutsideZone('bleeding-edge', 'pdf-es5.min.js');
addRunOutsideZone('bleeding-edge', 'viewer-es5.js');
addRunOutsideZone('bleeding-edge', 'viewer-es5.min.js');
