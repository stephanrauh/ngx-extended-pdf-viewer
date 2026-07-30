// build-tools/generate-sbom.js
//
// Writes projects/ngx-extended-pdf-viewer/sbom.json, a CycloneDX 1.6 SBOM that is published
// as part of the npm package (see #3244).
//
// Why this is hand-built instead of `cyclonedx-npm`:
//   - The published package has no runtime `dependencies` at all, only peerDependencies, which
//     the consumer resolves in their own tree and already sees. So there is no npm graph to walk.
//   - The one thing consumers *cannot* see is the bundled pdf.js, because it is a fork checked
//     out from git rather than installed from npm. That is exactly what this SBOM declares.
//   - Running cyclonedx-npm in the workspace root produced an SBOM of the build environment
//     (the private `ngx-pdf-viewer-demo` package), which never contained pdf.js.
//
// The pdf.js component carries a `purl` and a `cpe` pointing at the upstream release, so Mend,
// Dependency-Track, Trivy & co. can match CVEs, plus a CycloneDX `pedigree` block that states
// honestly that the bundled code is a patched fork of that release rather than a byte-identical
// copy of it.
//
// Run from the library root, after the engines have been built:
//   npm run build:sbom

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

process.chdir(path.join(__dirname, '..'));

// NGX_SBOM_LIB_DIR lets test-sbom.js point the generator at a fixture instead of the real
// library folder, so the pipeline can be exercised without building a 100 MB PDF engine first.
const LIB_DIR = process.env.NGX_SBOM_LIB_DIR || path.join('projects', 'ngx-extended-pdf-viewer');
const PROVENANCE_PATH = path.join(LIB_DIR, 'pdfjs-provenance.json');
const SBOM_PATH = path.join(LIB_DIR, 'sbom.json');

const packageJson = JSON.parse(fs.readFileSync(path.join(LIB_DIR, 'package.json'), 'utf8'));

if (!fs.existsSync(PROVENANCE_PATH)) {
  console.error(`Error 88: ${PROVENANCE_PATH} not found - run build-tools/base-library/update-pdfjs-provenance.js first`);
  process.exit(88);
}
const provenance = JSON.parse(fs.readFileSync(PROVENANCE_PATH, 'utf8'));
const channels = Object.entries(provenance.channels || {});
if (channels.length === 0) {
  console.error(`Error 88: ${PROVENANCE_PATH} lists no bundles`);
  process.exit(88);
}

// Cross-check the recorded provenance against the files that are actually about to be shipped,
// so a stale pdfjs-provenance.json cannot silently produce an SBOM that lies about the engine.
for (const [channel, entry] of channels) {
  const dir = path.join(LIB_DIR, entry.bundle);
  const expected = `pdf.worker-${entry.pdfjsBuildVersion}.mjs`;
  if (!fs.existsSync(path.join(dir, expected))) {
    console.error(`Error 89: ${PROVENANCE_PATH} claims ${channel} ships ${expected}, but ${dir} does not contain it`);
    console.error('         Rebuild the engine and re-run update-pdfjs-provenance.js for that branch.');
    process.exit(89);
  }
}

// A stable serial number: same library version -> same urn, so rebuilds stay comparable.
function deterministicUuid(seed) {
  const h = crypto.createHash('sha256').update(seed).digest('hex');
  return [
    h.slice(0, 8),
    h.slice(8, 12),
    `5${h.slice(13, 16)}`,
    ((parseInt(h.slice(16, 17), 16) & 0x3) | 0x8).toString(16) + h.slice(17, 20),
    h.slice(20, 32),
  ].join('-');
}

const rootRef = `pkg:npm/${packageJson.name}@${packageJson.version}`;

const components = channels.map(([channel, entry]) => {
  const upstreamPurl = `pkg:npm/pdfjs-dist@${entry.upstream.release}`;
  return {
    'bom-ref': `${upstreamPurl}?bundle=${entry.bundle}`,
    type: 'library',
    name: 'pdfjs-dist',
    version: entry.upstream.release,
    publisher: 'Mozilla Foundation',
    scope: 'required',
    description:
      `Mozilla pdf.js ${entry.upstream.release}, bundled in ${entry.bundle}/ as a patched fork ` +
      `(build ${entry.pdfjsBuildVersion}). Not installed from npm - see pedigree.`,
    purl: upstreamPurl,
    cpe: `cpe:2.3:a:mozilla:pdf.js:${entry.upstream.release}:*:*:*:*:*:*:*`,
    licenses: [{ license: { id: 'Apache-2.0' } }],
    pedigree: {
      ancestors: [
        {
          type: 'library',
          name: 'pdfjs-dist',
          version: entry.upstream.release,
          purl: upstreamPurl,
          externalReferences: [{ type: 'vcs', url: `${entry.upstream.repository}/tree/${entry.upstream.tag}` }],
        },
      ],
      commits: [
        { uid: entry.upstream.commit, url: `${entry.upstream.repository}/commit/${entry.upstream.commit}` },
        { uid: entry.fork.commit, url: `${entry.fork.repository}/commit/${entry.fork.commit}` },
      ],
      notes:
        `The bundled engine is a fork of Mozilla pdf.js ${entry.upstream.release}, maintained at ${entry.fork.repository} ` +
        `(branch ${entry.fork.branch}, commit ${entry.fork.commit}). It carries modifications for Angular integration, ` +
        'marked in the sources with "modified by ngx-extended-pdf-viewer" comments. The version above identifies the ' +
        'upstream release the fork is derived from so that vulnerability matching works; it does not assert that the ' +
        'bundled files are byte-identical to that release. Fixes for known pdf.js vulnerabilities are picked up by ' +
        'merging upstream, and only the latest release of ngx-extended-pdf-viewer receives them.',
    },
    properties: [
      { name: 'ngx-extended-pdf-viewer:channel', value: channel },
      { name: 'ngx-extended-pdf-viewer:bundle', value: entry.bundle },
      { name: 'ngx-extended-pdf-viewer:pdfjsBuildVersion', value: entry.pdfjsBuildVersion },
      { name: 'ngx-extended-pdf-viewer:forkBranch', value: entry.fork.branch },
      { name: 'ngx-extended-pdf-viewer:forkCommit', value: entry.fork.commit },
    ],
    externalReferences: [
      { type: 'vcs', url: entry.fork.repository },
      { type: 'website', url: entry.upstream.repository },
    ],
  };
});

const sbom = {
  bomFormat: 'CycloneDX',
  specVersion: '1.6',
  serialNumber: `urn:uuid:${deterministicUuid(rootRef)}`,
  version: 1,
  metadata: {
    // Deliberately the commit date of the newest bundled engine, not "now": the SBOM then only
    // changes when its contents change, so a local rebuild doesn't leave a spurious git diff and
    // two builds of the same sources produce identical files.
    timestamp: channels
      .map(([, entry]) => entry.fork.committedAt)
      .sort()
      .at(-1),
    tools: { components: [{ type: 'application', name: 'generate-sbom.js', group: 'ngx-extended-pdf-viewer' }] },
    authors: [{ name: packageJson.author.name, email: 'security@beyondjava.de' }],
    component: {
      'bom-ref': rootRef,
      type: 'library',
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      purl: rootRef,
      licenses: [{ license: { id: packageJson.license } }],
      externalReferences: [
        { type: 'website', url: packageJson.homepage },
        { type: 'vcs', url: packageJson.repository.url },
        { type: 'issue-tracker', url: packageJson.bugs.url },
        { type: 'distribution', url: `https://registry.npmjs.org/${packageJson.name}/-/${packageJson.name}-${packageJson.version}.tgz` },
      ],
      properties: [
        {
          name: 'ngx-extended-pdf-viewer:peerDependencies',
          value:
            'This package declares only peerDependencies (Angular), which the consuming project resolves in its own ' +
            'dependency tree and its scanners already see. It has no runtime npm dependencies of its own.',
        },
        {
          name: 'ngx-extended-pdf-viewer:supportedVersions',
          value: 'Only the latest published version receives security updates. See SECURITY.md.',
        },
      ],
    },
  },
  components,
  dependencies: [{ ref: rootRef, dependsOn: components.map((c) => c['bom-ref']) }, ...components.map((c) => ({ ref: c['bom-ref'], dependsOn: [] }))],
};

fs.writeFileSync(SBOM_PATH, `${JSON.stringify(sbom, null, 2)}\n`);
console.log(`✓ ${SBOM_PATH} written`);

// Never leave an invalid SBOM on disk. validate-sbom.js exits non-zero and explains itself.
execFileSync(process.execPath, [path.join(__dirname, 'validate-sbom.js')], { stdio: 'inherit' });
