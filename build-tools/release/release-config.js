// build-tools/release/release-config.js
//
// Loads release-config.json, the one file that legitimately differs between release lines.
//
// Everything the release scripts need to know about *which* line they are releasing lives here, so
// 5-1-prepare-release.js and 5-2-release-library-ci.js stay byte-identical on main and on every
// maintenance branch. That is what makes them cherry-pickable: porting a release fix to the 27.x
// line is one conflict-free `git cherry-pick`, and only this JSON gets hand-edited.
//
//   forkStableBranch       branch of the mypdf.js fork holding the engine for this line. Built into
//                          the library's assets/ folder. e.g. '6.1' on main, '6.0' for 28.x,
//                          '5.6.205' for 27.x. Find it with release/find-fork-commit.js.
//
//   forkBleedingEdgeBranch branch supplying the bleeding-edge/ bundle, or null for a maintenance
//                          release. null means "this line has no bleeding-edge channel of its own":
//                          both bundles are built from forkStableBranch, and the fork's
//                          bleeding-edge branch is neither built, committed nor tagged - it has
//                          moved on to a newer major that must not leak into a patch release.
//
//   npmDistTag             dist-tag to publish under, or null to derive it from the version string
//                          (alpha/beta/rc/latest). Pin it on a maintenance line: without it,
//                          publishing 28.1.2 after 29.0.0 would move `latest` back to the older
//                          major and silently downgrade every fresh `npm install`.

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'release-config.json');

function loadReleaseConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Error 95: ${CONFIG_PATH} is missing.`);
    console.error('Every release branch needs one. See build-tools/MAINTENANCE-RELEASE.md.');
    process.exit(95);
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (error) {
    console.error(`Error 95: ${CONFIG_PATH} is not valid JSON: ${error.message}`);
    process.exit(95);
  }

  if (!config.forkStableBranch || typeof config.forkStableBranch !== 'string') {
    console.error('Error 95: release-config.json needs a non-empty "forkStableBranch".');
    process.exit(95);
  }
  // Absent and null both mean "no bleeding-edge channel", but an empty string is a typo, not intent.
  if (config.forkBleedingEdgeBranch !== null && config.forkBleedingEdgeBranch !== undefined && typeof config.forkBleedingEdgeBranch !== 'string') {
    console.error('Error 95: "forkBleedingEdgeBranch" must be a branch name or null.');
    process.exit(95);
  }
  if (config.forkBleedingEdgeBranch === '') {
    console.error('Error 95: "forkBleedingEdgeBranch" is an empty string - use null to mean "maintenance release".');
    process.exit(95);
  }

  const resolved = {
    forkStableBranch: config.forkStableBranch,
    forkBleedingEdgeBranch: config.forkBleedingEdgeBranch || null,
    npmDistTag: config.npmDistTag || null,
  };
  resolved.isMaintenanceRelease = resolved.forkBleedingEdgeBranch === null;
  return resolved;
}

function describeReleaseConfig(config) {
  const lines = [`\n📋 Release line: stable engine from the fork's '${config.forkStableBranch}' branch`];
  if (config.isMaintenanceRelease) {
    lines.push("   Maintenance release: both bundles come from that same branch, and the fork's");
    lines.push('   bleeding-edge branch is left untouched, uncommitted and untagged.');
  } else {
    lines.push(`   Bleeding-edge bundle from the fork's '${config.forkBleedingEdgeBranch}' branch`);
  }
  if (config.npmDistTag) {
    lines.push(`   npm dist-tag pinned to '${config.npmDistTag}'`);
  }
  return lines.join('\n');
}

module.exports = { loadReleaseConfig, describeReleaseConfig, CONFIG_PATH };
