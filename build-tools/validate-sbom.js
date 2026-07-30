// build-tools/validate-sbom.js
//
// Proves that projects/ngx-extended-pdf-viewer/sbom.json is (a) valid CycloneDX 1.6 and
// (b) actually describes the files we are about to publish (#3244).
//
// generate-sbom.js runs this automatically, so an invalid SBOM can never be written. It is also
// a standalone check - `npm run test:sbom` - which is what CI runs against the checked-in file:
// that catches an sbom.json that went stale because someone rebuilt the engine without
// regenerating it.
//
// Schema validation uses the vendored copies in build-tools/schema/ (see the README there), so
// this works offline and adds no supply-chain surface.

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

process.chdir(path.join(__dirname, '..'));

// See generate-sbom.js - test-sbom.js uses this to validate a fixture.
const LIB_DIR = process.env.NGX_SBOM_LIB_DIR || path.join('projects', 'ngx-extended-pdf-viewer');
const SBOM_PATH = path.join(LIB_DIR, 'sbom.json');
const VEX_PATH = path.join(LIB_DIR, 'vex.json');
const PROVENANCE_PATH = path.join(LIB_DIR, 'pdfjs-provenance.json');
const SCHEMA_DIR = path.join('build-tools', 'schema');

const errors = [];
const skipped = [];
const fail = (message) => errors.push(message);

if (!fs.existsSync(SBOM_PATH)) {
  console.error(`✗ ${SBOM_PATH} does not exist - run "npm run build:sbom"`);
  process.exit(90);
}
const sbom = JSON.parse(fs.readFileSync(SBOM_PATH, 'utf8'));
const provenance = JSON.parse(fs.readFileSync(PROVENANCE_PATH, 'utf8'));
const packageJson = JSON.parse(fs.readFileSync(path.join(LIB_DIR, 'package.json'), 'utf8'));

// ---------------------------------------------------------------- schema validation

// The schemas are the unmodified upstream files, so their $id fields already match the relative
// $refs bom-1.6 makes to its two siblings - registering them by $id is all that's needed.
const loadSchema = (file) => JSON.parse(fs.readFileSync(path.join(SCHEMA_DIR, file), 'utf8'));

const ajv = new Ajv({ strict: false, allErrors: true, logger: false });
addFormats(ajv);
ajv.addSchema(loadSchema('spdx.schema.json'));
ajv.addSchema(loadSchema('jsf-0.82.schema.json'));
const validate = ajv.compile(loadSchema('bom-1.6.schema.json'));

if (!validate(sbom)) {
  for (const e of validate.errors) {
    fail(`schema: sbom.json ${e.instancePath || '/'} ${e.message}`);
  }
}

const vex = fs.existsSync(VEX_PATH) ? JSON.parse(fs.readFileSync(VEX_PATH, 'utf8')) : null;
if (!vex) {
  fail('vex.json is missing - run "npm run build:sbom"');
} else if (!validate(vex)) {
  for (const e of validate.errors) {
    fail(`schema: vex.json ${e.instancePath || '/'} ${e.message}`);
  }
}

// ---------------------------------------------------------------- semantic checks
// A schema-valid SBOM can still be useless. These assert the things the SBOM exists to deliver.

if (sbom.metadata?.component?.version !== packageJson.version) {
  fail(`the SBOM describes version ${sbom.metadata?.component?.version}, but package.json says ${packageJson.version}`);
}

const channels = Object.entries(provenance.channels || {});
if (channels.length === 0) {
  fail('pdfjs-provenance.json lists no bundles');
}

for (const [channel, entry] of channels) {
  const component = sbom.components?.find((c) => c.properties?.some((p) => p.name === 'ngx-extended-pdf-viewer:channel' && p.value === channel));
  if (!component) {
    fail(`no SBOM component for the ${channel} bundle`);
    continue;
  }

  // The whole point of the file: a scanner must be able to match pdf.js advisories.
  if (component.purl !== `pkg:npm/pdfjs-dist@${entry.upstream.release}`) {
    fail(`${channel}: purl is ${component.purl}, expected pkg:npm/pdfjs-dist@${entry.upstream.release}`);
  }
  if (component.cpe !== `cpe:2.3:a:mozilla:pdf.js:${entry.upstream.release}:*:*:*:*:*:*:*`) {
    fail(`${channel}: cpe does not match upstream release ${entry.upstream.release}`);
  }
  // ... and it must not pretend the fork is byte-identical to upstream.
  if (!component.pedigree?.ancestors?.length) {
    fail(`${channel}: pedigree.ancestors is missing - the SBOM would claim unmodified upstream code`);
  }
  if (!component.pedigree?.commits?.some((c) => c.uid === entry.fork.commit)) {
    fail(`${channel}: pedigree does not record fork commit ${entry.fork.commit}`);
  }

  // The engine the SBOM describes must be the engine on disk - but the bundles are git-ignored
  // build output, so on a fresh checkout there is nothing to compare against and we skip this.
  const bundleDir = path.join(LIB_DIR, entry.bundle);
  const worker = `pdf.worker-${entry.pdfjsBuildVersion}.mjs`;
  if (!fs.existsSync(bundleDir)) {
    skipped.push(`${channel}: ${entry.bundle}/ not built, cannot compare the SBOM against the actual engine`);
  } else if (!fs.existsSync(path.join(bundleDir, worker))) {
    fail(`${channel}: ${entry.bundle}/${worker} is missing - sbom.json is stale, re-run "npm run build:sbom"`);
  }
  const buildVersion = component.properties?.find((p) => p.name === 'ngx-extended-pdf-viewer:pdfjsBuildVersion')?.value;
  if (buildVersion !== entry.pdfjsBuildVersion) {
    fail(`${channel}: SBOM says build ${buildVersion}, pdfjs-provenance.json says ${entry.pdfjsBuildVersion}`);
  }
}

// Every applied security fix must show up in BOTH the pedigree and the VEX. If it appears in
// neither, we silently under-report and consumers chase a vulnerability we already fixed; if it
// appears in only one, the two documents contradict each other.
const CDX_STATES = ['resolved', 'resolved_with_pedigree', 'exploitable', 'in_triage', 'false_positive', 'not_affected'];
const sbomSerial = (sbom.serialNumber || '').replace('urn:uuid:', '');

for (const [channel, entry] of channels) {
  const component = sbom.components?.find((c) => c.properties?.some((p) => p.name === 'ngx-extended-pdf-viewer:channel' && p.value === channel));
  for (const fix of entry.securityFixes || []) {
    const patch = component?.pedigree?.patches?.find((p) => p.resolves?.some((r) => r.id === fix.cve));
    if (!patch) {
      fail(`${channel}: ${fix.cve} is applied to the engine but has no pedigree.patches entry`);
    } else if (!['cherry-pick', 'backport'].includes(patch.type)) {
      fail(`${channel}: ${fix.cve} patch type "${patch.type}" is not a CycloneDX patch type`);
    }

    const statement = vex?.vulnerabilities?.find((v) => v.id === fix.cve);
    if (!statement) {
      fail(`${channel}: ${fix.cve} has no VEX statement - scanners would report it as unresolved`);
      continue;
    }
    if (!CDX_STATES.includes(statement.analysis?.state)) {
      fail(`${fix.cve}: analysis.state "${statement.analysis?.state}" is not a CycloneDX analysis state`);
    }
    // The statement has to actually point at this bundle, via a bom-link into sbom.json.
    const expected = `urn:cdx:${sbomSerial}/${sbom.version}#pdfjs-${channel}`;
    if (!statement.affects?.some((a) => a.ref === expected)) {
      fail(`${fix.cve}: VEX does not link to the ${channel} component (expected affects.ref ${expected})`);
    }
  }
}

// A VEX statement about something we don't ship is a bug in the other direction.
for (const statement of vex?.vulnerabilities || []) {
  const known = channels.some(([, entry]) => (entry.securityFixes || []).some((f) => f.cve === statement.id));
  if (!known) {
    fail(`vex.json has a statement for ${statement.id}, which no bundle records as applied`);
  }
}

// Every bom-ref referenced in the dependency graph must exist.
const refs = new Set([sbom.metadata?.component?.['bom-ref'], ...(sbom.components || []).map((c) => c['bom-ref'])]);
for (const dependency of sbom.dependencies || []) {
  for (const ref of [dependency.ref, ...(dependency.dependsOn || [])]) {
    if (!refs.has(ref)) {
      fail(`dependency graph references unknown bom-ref "${ref}"`);
    }
  }
}

// ---------------------------------------------------------------- verdict

if (errors.length > 0) {
  console.error(`✗ ${SBOM_PATH} is not valid:`);
  for (const message of errors) {
    console.error(`    - ${message}`);
  }
  process.exit(91);
}

console.log(`✓ ${SBOM_PATH} is valid CycloneDX ${sbom.specVersion}`);
for (const c of sbom.components) {
  console.log(`    ${c.purl}  (${c.properties.find((p) => p.name.endsWith('bundle')).value}/)`);
}
for (const message of skipped) {
  console.log(`  ⚠️  skipped - ${message}`);
}
