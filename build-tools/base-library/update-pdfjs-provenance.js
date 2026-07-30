// build-tools/base-library/update-pdfjs-provenance.js
//
// Records which pdf.js the library actually bundles, so that consumers (and their
// security scanners) can tell. We ship a *fork* of pdf.js, so pdfjs-dist can never be
// a normal npm dependency - see https://github.com/stephanrauh/ngx-extended-pdf-viewer/issues/3244.
// This script writes the provenance of the engine that was just built into
// projects/ngx-extended-pdf-viewer/pdfjs-provenance.json, which is published as part
// of the npm package and is the input for generate-sbom.js.
//
// Run it right after the engine build, from the library root:
//   node ./build-tools/base-library/update-pdfjs-provenance.js
//
// The fork's checked-out branch selects the channel, exactly like updateMozillasPdfViewer.js:
// branch `bleeding-edge` -> the bleeding-edge/ bundle, anything else -> the stable assets/ bundle.
//
// Pass `--ref <branch>` to read the git data from another branch of the fork instead of HEAD.
// That backfills the entry for a bundle that is already built without checking that branch out:
//   node ./build-tools/base-library/update-pdfjs-provenance.js --ref 6.1

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FORK_DIR = path.join('..', 'mypdf.js');
const PROVENANCE_PATH = path.join('projects', 'ngx-extended-pdf-viewer', 'pdfjs-provenance.json');
const NOTICE_PATHS = [path.join('projects', 'ngx-extended-pdf-viewer', 'NOTICE'), 'NOTICE'];

const NOTICE_BEGIN = '--- BEGIN BUNDLED PDF.JS PROVENANCE (generated) ---';
const NOTICE_END = '--- END BUNDLED PDF.JS PROVENANCE (generated) ---';

function git(args) {
  return execSync(`git ${args}`, { cwd: FORK_DIR, encoding: 'utf8' }).trim();
}

function gitOrNull(args) {
  try {
    return git(args);
  } catch (e) {
    return null;
  }
}

const refArgIndex = process.argv.indexOf('--ref');
const REF = refArgIndex === -1 ? 'HEAD' : process.argv[refArgIndex + 1];
if (refArgIndex !== -1 && !REF) {
  console.error('Error: --ref needs a branch name');
  process.exit(2);
}

// Which bundle did we just build? Same rule as updateMozillasPdfViewer.js.
function detectChannel() {
  const branch = REF === 'HEAD' ? git('rev-parse --abbrev-ref HEAD') : REF;
  if (branch === 'bleeding-edge') {
    return { channel: 'bleedingEdge', folder: 'bleeding-edge', branch };
  }
  if (branch === 'HEAD') {
    const tag = gitOrNull(`describe --tags --exact-match ${REF}`);
    if (tag && tag.includes('bleeding-edge')) {
      return { channel: 'bleedingEdge', folder: 'bleeding-edge', branch: tag };
    }
  }
  return { channel: 'stable', folder: 'assets', branch };
}

// The version stamped into the bundled file names, e.g. 6.1.1155. It is the fork's own
// build number (versionPrefix + commit count), not a version Mozilla ever published.
function readBuildVersion(folder) {
  const dir = path.join('projects', 'ngx-extended-pdf-viewer', folder);
  const worker = fs.readdirSync(dir).find((f) => /^pdf\.worker-[\d.]+\.mjs$/.test(f));
  if (!worker) {
    console.error(`Error: no pdf.worker-<version>.mjs in ${dir} - build the engine first`);
    process.exit(86);
  }
  return worker.replace(/^pdf\.worker-/, '').replace(/\.mjs$/, '');
}

// The last upstream release merged into this branch. Mozilla's tags travel with the merges,
// so `git describe` on the fork points at the pdf.js release the bundle is derived from.
function readUpstreamRelease() {
  const tag = gitOrNull(`describe --tags --match 'v*' --abbrev=0 ${REF}`);
  if (!tag) {
    console.error('Error: cannot determine the upstream pdf.js release - no v* tag reachable from HEAD');
    process.exit(87);
  }
  const commit = git(`rev-parse ${tag}^{commit}`);
  return { tag, release: tag.replace(/^v/, ''), commit, committedAt: git(`show -s --format=%cI ${commit}`) };
}

function updateNotice(provenance) {
  const lines = [NOTICE_BEGIN, ''];
  for (const entry of Object.values(provenance.channels)) {
    lines.push(`  ${entry.bundle}/`);
    lines.push(`    based on Mozilla pdf.js ${entry.upstream.release} (${entry.upstream.tag}, commit ${entry.upstream.commit})`);
    lines.push(`    built from ${entry.fork.repository} branch ${entry.fork.branch}, commit ${entry.fork.commit}`);
    lines.push(`    bundled build version: ${entry.pdfjsBuildVersion} (fork build number, not an upstream release)`);
    lines.push('');
  }
  lines.push('  A machine-readable form of the above is published as pdfjs-provenance.json');
  lines.push('  and sbom.json (CycloneDX) inside this package.');
  lines.push('');
  lines.push(NOTICE_END);
  const block = lines.join('\n');

  for (const noticePath of NOTICE_PATHS) {
    if (!fs.existsSync(noticePath)) {
      continue;
    }
    const notice = fs.readFileSync(noticePath, 'utf8');
    const begin = notice.indexOf(NOTICE_BEGIN);
    const end = notice.indexOf(NOTICE_END);
    let updated;
    if (begin !== -1 && end !== -1) {
      updated = notice.slice(0, begin) + block + notice.slice(end + NOTICE_END.length);
    } else {
      // First run: put the block right after the paragraph that mentions the fork.
      const anchor = 'customizations and enhancements for Angular integration.';
      const at = notice.indexOf(anchor);
      if (at === -1) {
        console.warn(`⚠️  ${noticePath}: anchor paragraph not found, appending the provenance block`);
        updated = `${notice.trimEnd()}\n\n${block}\n`;
      } else {
        const cut = at + anchor.length;
        updated = `${notice.slice(0, cut)}\n\n${block}${notice.slice(cut)}`;
      }
    }
    fs.writeFileSync(noticePath, updated);
    console.log(`✓ ${noticePath} updated`);
  }
}

const { channel, folder, branch } = detectChannel();
const upstream = readUpstreamRelease();
const entry = {
  bundle: folder,
  pdfjsBuildVersion: readBuildVersion(folder),
  upstream: {
    project: 'mozilla/pdf.js',
    repository: 'https://github.com/mozilla/pdf.js',
    release: upstream.release,
    tag: upstream.tag,
    commit: upstream.commit,
    committedAt: upstream.committedAt,
  },
  fork: {
    repository: 'https://github.com/stephanrauh/pdf.js',
    branch,
    commit: git(`rev-parse ${REF}^{commit}`),
    committedAt: git(`show -s --format=%cI ${REF}^{commit}`),
  },
};

let provenance = { channels: {} };
if (fs.existsSync(PROVENANCE_PATH)) {
  provenance = JSON.parse(fs.readFileSync(PROVENANCE_PATH, 'utf8'));
  provenance.channels = provenance.channels || {};
}
provenance = {
  $comment:
    'ngx-extended-pdf-viewer bundles a fork of Mozilla pdf.js, so pdfjs-dist cannot appear in package.json. ' +
    'This file records which pdf.js each bundle is derived from. Generated by build-tools/base-library/update-pdfjs-provenance.js.',
  generatedBy: 'build-tools/base-library/update-pdfjs-provenance.js',
  channels: { ...provenance.channels, [channel]: entry },
};

fs.writeFileSync(PROVENANCE_PATH, `${JSON.stringify(provenance, null, 2)}\n`);
console.log(`✓ ${PROVENANCE_PATH} updated (${channel}: pdf.js ${entry.upstream.release}, build ${entry.pdfjsBuildVersion})`);

updateNotice(provenance);
