const fs = require('fs');

function removeUnusedExportStatement(folder = 'assets', file) {
  const f = `./projects/ngx-extended-pdf-viewer/${folder}/${file}`;
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f).toString();
    // #2874 remove the unnecessary export statement from the ES5 version of the worker file
    const code = content.replace(`export {`, `// export {`);
    // end of #2874

    if (code !== content) {
      console.log(`Removing unused export statement from ${f}`);
      fs.writeFileSync(f, code);
    }
  }
}

removeUnusedExportStatement('bleeding-edge', 'pdf.worker-es5.mjs');
removeUnusedExportStatement('assets', 'pdf.worker-es5.mjs');
