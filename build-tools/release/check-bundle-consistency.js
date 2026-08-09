/**
 * Fails when the engine version the SOURCE claims does not match the files on disk.
 *
 * `pdf-default-options.ts` hardcodes the build number of each bundle, and every
 * asset URL is derived from it (`getVersionSuffix`). If the constant and the
 * folder disagree, every request 404s, the dev server answers with index.html,
 * and the browser reports:
 *
 *   Failed to load module script: Expected a JavaScript-or-Wasm module script
 *   but the server responded with a MIME type of "text/html"
 *
 * ...which says nothing about the real cause. Playwright then burns a 60s timeout
 * per test waiting for a canvas that can never appear. This check turns that into
 * an instant, readable error.
 *
 * How the two get out of sync in normal use:
 *   - `build:base` writes assets/ or bleeding-edge/ depending on the branch checked
 *     out in ../mypdf.js, and stamps only that channel's constant;
 *   - a release run builds with `--quick` (gulp generic only) and bumps the
 *     constant; a later `git reset` in the library reverts the constant but not
 *     the generated files.
 *
 * Only the plain `.mjs` files are required: `--quick` builds legitimately omit the
 * `-es5` and `.min` variants, which CI produces for the published package.
 */
const fs = require('fs');
const path = require('path');

const LIB_DIR = path.join('projects', 'ngx-extended-pdf-viewer');
const OPTIONS_FILE = path.join(LIB_DIR, 'src', 'lib', 'options', 'pdf-default-options.ts');

function readVersion(source, constantName) {
  const match = new RegExp(`export const ${constantName} = '([^']+)'`).exec(source);
  if (!match) {
    console.error(`✗ cannot find ${constantName} in ${OPTIONS_FILE}`);
    process.exit(85);
  }
  return match[1];
}

const source = fs.readFileSync(OPTIONS_FILE, 'utf8');
const channels = [
  { bundle: 'assets', version: readVersion(source, 'pdfjsVersion'), constant: 'pdfjsVersion' },
  { bundle: 'bleeding-edge', version: readVersion(source, 'pdfjsBleedingEdgeVersion'), constant: 'pdfjsBleedingEdgeVersion' },
];

let failed = false;

for (const { bundle, version, constant } of channels) {
  const dir = path.join(LIB_DIR, bundle);
  if (!fs.existsSync(dir)) {
    console.log(`⏭️  ${bundle}/ is not built - skipping (fresh checkout?)`);
    continue;
  }
  const required = [`viewer-${version}.mjs`, `pdf.worker-${version}.mjs`];
  const missing = required.filter((file) => !fs.existsSync(path.join(dir, file)));
  if (missing.length === 0) {
    console.log(`✓ ${bundle}/ matches ${constant} = ${version}`);
    continue;
  }
  failed = true;
  const present = fs
    .readdirSync(dir)
    .filter((file) => /^viewer-.*\.mjs$/.test(file))
    .sort();
  console.error(`\n✗ ${bundle}/ does not match ${constant} = ${version}`);
  console.error(`  missing: ${missing.join(', ')}`);
  console.error(`  present: ${present.length ? present.join(', ') : '(no viewer bundle at all)'}`);
  console.error(`  fix: check out the matching branch in ../mypdf.js and run "npm run build:base"`);
  console.error(`       (bleeding-edge -> bleeding-edge/, any other branch -> assets/)`);
}

if (failed) {
  console.error('\nRefusing to continue: the viewer would request files that do not exist.');
  process.exit(86);
}
