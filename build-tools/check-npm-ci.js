// build-tools/check-npm-ci.js
//
// The publish workflow installs the dependencies with `npm ci`, which is much stricter than the
// `npm install`/`npm update` we run locally. So a dependency update can look fine here and still
// break the release in CI. This script runs `npm ci --dry-run` (it doesn't touch node_modules)
// and, if npm refuses, explains why in plain words.
//
// Usage: node build-tools/check-npm-ci.js   (exit code 0 = fine, 1 = npm ci would fail)

const { spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const result = spawnSync('npm', ['ci', '--ignore-scripts', '--dry-run', '--no-audit', '--no-fund', '--loglevel', 'verbose'], {
  cwd: root,
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

if (result.status === 0) {
  console.log('✓ npm ci accepts package.json and package-lock.json');
  process.exit(0);
}

const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
const lines = output.split('\n');

// npm hides the real reason why it can't load the lock file in a verbose log line and prints a
// generic message instead ("can only install with an existing package-lock.json"), even when the
// lock file exists.
const loadError = lines.find((line) => line.startsWith('npm verbose loadVirtual'))?.replace('npm verbose loadVirtual', '').trim();
const npmErrors = lines
  .filter((line) => line.startsWith('npm error'))
  .map((line) => line.replace(/^npm error ?/, ''))
  .filter((line) => line.trim() !== '');
const cause = loadError || npmErrors.slice(0, 12).join('\n  ') || result.error?.message || 'unknown';

let explanation;
let fix;
const override = /Override for (\S+?)@(\S+) conflicts with direct dependency/.exec(cause);
if (override) {
  const [, name, range] = override;
  explanation = `An entry in "overrides" in package.json contradicts the direct dependency "${name}": "${range}".\n` +
    `  This usually happens when a dependency update raises the version in "dependencies" or\n` +
    `  "devDependencies", but not in the matching override. npm install doesn't mind, npm ci does.`;
  fix = `Find "${name}" (or "${name}@<major>") in the "overrides" block of package.json and give it the same\n` +
    `  range as the direct dependency ("${range}"), or write it as "$${name}" so it always follows the\n` +
    `  direct dependency.`;
} else if (/in sync/.test(output)) {
  explanation = 'package.json and package-lock.json disagree: the lock file is outdated.';
  fix = 'Run `npm install --ignore-scripts` and commit the updated package-lock.json.';
} else if (/ENOENT/.test(cause) || (!loadError && /existing package-lock\.json/.test(output))) {
  explanation = 'There is no package-lock.json, or npm cannot read it.';
  fix = 'Run `npm install --ignore-scripts` and commit package-lock.json.';
} else if (loadError) {
  explanation = 'npm cannot load package-lock.json. Its own message ("can only install with an existing\n' +
    '  package-lock.json") is misleading: npm shows it for every error while reading the lock file.';
  fix = 'Fix the cause shown above, then run `node build-tools/check-npm-ci.js` again.';
} else {
  explanation = 'npm ci failed for a reason this script does not recognize.';
  fix = `Run \`npm ci --ignore-scripts --dry-run --loglevel verbose\` in ${root} to see the full log.`;
}

console.error(`
🚫 npm ci would fail, so the publish workflow (.github/workflows/publish.yml) would fail too.
   Nothing has been changed; this was a dry run.

Cause (from npm):
  ${cause}

What it means:
  ${explanation}

How to fix it:
  ${fix}
`);
process.exit(1);
