// build-tools/test-sbom.js
//
// Regression test for the SBOM pipeline - `npm run test:sbom`.
//
// sbom.json is git-ignored build output, so there is no committed file for CI to check. Instead
// this drives generate-sbom.js and validate-sbom.js against a fixture library folder (a fake
// package.json, a fake pdfjs-provenance.json and two empty pdf.worker files), which needs no
// pdf.js build and runs in well under a second on a fresh checkout.
//
// It asserts the four things that would actually hurt if they broke:
//   1. the generated SBOM is schema-valid CycloneDX
//   2. it carries the purl/cpe/pedigree a scanner needs
//   3. it is byte-for-byte reproducible
//   4. the staleness guards really fire (a wrong build version is caught, not shrugged off)

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

process.chdir(path.join(__dirname, '..'));

const FIXTURE = fs.mkdtempSync(path.join(os.tmpdir(), 'ngx-sbom-test-'));
let failures = 0;

function check(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.error(`  ✗ ${name}\n      ${error.message}`);
    failures++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// A fixture that mirrors the real layout: two channels on different upstream releases, so the
// test also covers the case where stable and bleeding-edge have drifted apart.
function writeFixture() {
  fs.writeFileSync(
    path.join(FIXTURE, 'package.json'),
    JSON.stringify(
      {
        name: 'ngx-extended-pdf-viewer',
        version: '99.1.2',
        description: 'fixture',
        license: 'Apache-2.0',
        homepage: 'https://pdfviewer.net',
        repository: { url: 'https://github.com/stephanrauh/ngx-extended-pdf-viewer' },
        bugs: { url: 'https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues' },
        author: { name: 'Stephan Rauh' },
      },
      null,
      2,
    ),
  );

  const channel = (bundle, release, build, commit, branch) => ({
    bundle,
    pdfjsBuildVersion: build,
    upstream: {
      project: 'mozilla/pdf.js',
      repository: 'https://github.com/mozilla/pdf.js',
      release,
      tag: `v${release}`,
      commit: 'a'.repeat(40),
      committedAt: '2026-01-02T03:04:05+01:00',
    },
    fork: { repository: 'https://github.com/stephanrauh/pdf.js', branch, commit, committedAt: '2026-02-03T04:05:06+01:00' },
  });

  fs.writeFileSync(
    path.join(FIXTURE, 'pdfjs-provenance.json'),
    JSON.stringify(
      {
        channels: {
          stable: channel('assets', '6.1.200', '6.1.1155', 'b'.repeat(40), '6.1'),
          bleedingEdge: channel('bleeding-edge', '6.2.99', '6.2.42', 'c'.repeat(40), 'bleeding-edge'),
        },
      },
      null,
      2,
    ),
  );

  for (const [bundle, build] of [
    ['assets', '6.1.1155'],
    ['bleeding-edge', '6.2.42'],
  ]) {
    fs.mkdirSync(path.join(FIXTURE, bundle), { recursive: true });
    fs.writeFileSync(path.join(FIXTURE, bundle, `pdf.worker-${build}.mjs`), '// fixture');
  }
}

function run(script, { expectFailure = false } = {}) {
  try {
    const stdout = execFileSync(process.execPath, [path.join(__dirname, script)], {
      env: { ...process.env, NGX_SBOM_LIB_DIR: FIXTURE },
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (expectFailure) {
      throw new Error(`${script} was expected to fail, but it succeeded`);
    }
    return stdout;
  } catch (error) {
    if (expectFailure && error.status) {
      return `${error.stdout || ''}${error.stderr || ''}`;
    }
    throw new Error(`${script} failed: ${error.stderr || error.message}`);
  }
}

const readSbom = () => JSON.parse(fs.readFileSync(path.join(FIXTURE, 'sbom.json'), 'utf8'));

try {
  console.log('SBOM pipeline:');
  writeFixture();

  // generate-sbom.js invokes validate-sbom.js itself, so a green run here already means the
  // document passed the vendored CycloneDX 1.6 schema.
  check('generates and self-validates against the CycloneDX 1.6 schema', () => {
    const output = run('generate-sbom.js');
    assert(output.includes('valid CycloneDX 1.6'), 'the generator did not report a successful validation');
  });

  check('describes every bundle with the metadata a scanner needs', () => {
    const sbom = readSbom();
    assert(sbom.components.length === 2, `expected 2 components, got ${sbom.components.length}`);
    for (const [release, bundle] of [
      ['6.1.200', 'assets'],
      ['6.2.99', 'bleeding-edge'],
    ]) {
      const component = sbom.components.find((c) => c.properties.some((p) => p.name.endsWith(':bundle') && p.value === bundle));
      assert(component, `no component for ${bundle}/`);
      assert(component.purl === `pkg:npm/pdfjs-dist@${release}`, `${bundle}: wrong purl ${component.purl}`);
      assert(component.cpe.includes(`:pdf.js:${release}:`), `${bundle}: wrong cpe ${component.cpe}`);
      assert(component.pedigree.ancestors.length === 1, `${bundle}: pedigree.ancestors missing`);
      assert(component.licenses[0].license.id === 'Apache-2.0', `${bundle}: license missing`);
    }
  });

  check('names the right library version', () => {
    assert(readSbom().metadata.component.version === '99.1.2', 'metadata.component.version does not follow package.json');
  });

  // Guards against a "now" timestamp or a random serial number sneaking back in: those would make
  // every local build dirty the working tree and make releases unreproducible.
  check('is reproducible - regenerating changes nothing', () => {
    const first = fs.readFileSync(path.join(FIXTURE, 'sbom.json'), 'utf8');
    run('generate-sbom.js');
    assert(fs.readFileSync(path.join(FIXTURE, 'sbom.json'), 'utf8') === first, 'two runs produced different output');
  });

  // The guard that matters most: it must be impossible to ship an SBOM naming an engine that
  // isn't the one in the package.
  check('refuses to generate when the provenance does not match the bundled engine', () => {
    const provenancePath = path.join(FIXTURE, 'pdfjs-provenance.json');
    const good = fs.readFileSync(provenancePath, 'utf8');
    const stale = JSON.parse(good);
    stale.channels.stable.pdfjsBuildVersion = '6.1.9999';
    fs.writeFileSync(provenancePath, JSON.stringify(stale, null, 2));
    try {
      const output = run('generate-sbom.js', { expectFailure: true });
      assert(output.includes('6.1.9999'), 'the error message does not name the mismatching version');
    } finally {
      fs.writeFileSync(provenancePath, good);
    }
  });

  check('rejects an SBOM whose pedigree lost the fork commit', () => {
    run('generate-sbom.js');
    const sbomPath = path.join(FIXTURE, 'sbom.json');
    const tampered = readSbom();
    tampered.components[0].pedigree.commits = [];
    fs.writeFileSync(sbomPath, JSON.stringify(tampered, null, 2));
    const output = run('validate-sbom.js', { expectFailure: true });
    assert(output.includes('pedigree'), 'the validator did not complain about the pedigree');
  });

  check('rejects a document that is not valid CycloneDX', () => {
    const sbomPath = path.join(FIXTURE, 'sbom.json');
    const tampered = readSbom();
    delete tampered.components[0].type; // `type` is required by the schema
    fs.writeFileSync(sbomPath, JSON.stringify(tampered, null, 2));
    const output = run('validate-sbom.js', { expectFailure: true });
    assert(output.includes('schema:'), 'the schema violation was not reported');
  });
} finally {
  fs.rmSync(FIXTURE, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`\n✗ ${failures} SBOM check(s) failed`);
  process.exit(92);
}
console.log('\n✓ SBOM pipeline OK');
