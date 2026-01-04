#!/usr/bin/env node

/**
 * Automates the migration of the mypdf.js stable branch version
 *
 * Usage: node migrate-stable-version.js <old-version> <new-version>
 * Example: node migrate-stable-version.js 5.4.149 5.4.530
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node migrate-stable-version.js <old-version> <new-version>');
  console.error('Example: node migrate-stable-version.js 5.4.149 5.4.530');
  process.exit(1);
}

const [oldVersion, newVersion] = args;

// Validate version format (e.g., 5.4.149)
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(oldVersion) || !versionRegex.test(newVersion)) {
  console.error('Error: Versions must be in format X.Y.Z (e.g., 5.4.149)');
  process.exit(1);
}

// Extract major.minor versions (e.g., 5.4.149 → 5.4)
const oldMajorMinor = oldVersion.split('.').slice(0, 2).join('.');
const newMajorMinor = newVersion.split('.').slice(0, 2).join('.');

console.log(`\n🔄 Migrating stable version from ${oldVersion} to ${newVersion}\n`);

// Files to update
const filesToUpdate = [
  {
    path: 'build-tools/5-1-prepare-release.js',
    description: 'Release preparation script',
  },
  {
    path: 'build-tools/5-2-release-library-ci.js',
    description: 'CI release script',
  },
  {
    path: 'build-tools/release/createTag.js',
    description: 'Tag creation script',
  },
  {
    path: 'build-tools/RELEASE-PROCESS.md',
    description: 'Release documentation',
  },
];

let filesUpdated = 0;
let totalReplacements = 0;

// Update each file
filesToUpdate.forEach(({ path: filePath, description }) => {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} (file not found)`);
    return;
  }

  console.log(`📝 Updating ${description}...`);

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Replace all occurrences of old version with new version
  const regex = new RegExp(oldVersion.replace(/\./g, '\\.'), 'g');
  const matches = content.match(regex);
  const count = matches ? matches.length : 0;

  content = content.replace(regex, newVersion);

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`   ✅ Updated ${count} occurrence(s) in ${filePath}`);
    filesUpdated++;
    totalReplacements += count;
  } else {
    console.log(`   ℹ️  No changes needed in ${filePath}`);
  }
});

// Check if showcase navigation needs updating (only when major.minor changes)
const showcaseNavPath = path.join(__dirname, '..', '..', 'extended-pdf-viewer-showcase', 'src', 'app', 'nav', 'nav.component.html');

if (oldMajorMinor !== newMajorMinor) {
  console.log(`\n📝 Updating showcase navigation (pdf.js ${oldMajorMinor} → ${newMajorMinor})...`);

  if (fs.existsSync(showcaseNavPath)) {
    let navContent = fs.readFileSync(showcaseNavPath, 'utf8');
    const originalNavContent = navContent;

    // Update the specific navigation label - use regex to match any version
    // Pattern: stable (based on pdf.js X.Y)
    const labelRegex = /stable \(based on pdf\.js \d+\.\d+\)/;
    const newLabel = `stable (based on pdf.js ${newMajorMinor})`;

    if (labelRegex.test(navContent)) {
      navContent = navContent.replace(labelRegex, newLabel);

      if (navContent !== originalNavContent) {
        fs.writeFileSync(showcaseNavPath, navContent, 'utf8');
        console.log(`   ✅ Updated showcase navigation label`);
        filesUpdated++;
        totalReplacements++;
      } else {
        console.log(`   ℹ️  Already correct (using pdf.js ${newMajorMinor})`);
      }
    } else {
      console.log(`   ⚠️  Could not find showcase navigation label pattern`);
    }
  } else {
    console.log(`   ⚠️  Showcase navigation file not found at expected location`);
  }
} else {
  console.log(`\n📝 Showcase navigation: No update needed (major.minor unchanged: ${oldMajorMinor} → ${newMajorMinor})`);
}

console.log(`\n📊 Summary:`);
console.log(`   - Files updated: ${filesUpdated}`);
console.log(`   - Total replacements: ${totalReplacements}`);

// Verify the updates
console.log(`\n🔍 Verification:`);
try {
  const grepCommand = `grep -r "${oldVersion}" build-tools/ 2>/dev/null || true`;
  const result = execSync(grepCommand, { encoding: 'utf8' });

  if (result.trim()) {
    console.log(`   ⚠️  Warning: Found remaining references to ${oldVersion}:`);
    console.log(
      result
        .split('\n')
        .map((line) => `      ${line}`)
        .join('\n'),
    );
  } else {
    console.log(`   ✅ No remaining references to ${oldVersion} found in build-tools/`);
  }
} catch (error) {
  console.log(`   ⚠️  Could not verify (grep failed)`);
}

// Next steps
console.log(`\n📋 Next Steps:\n`);
console.log(`1. Review the changes:`);
console.log(`   git diff build-tools/\n`);
console.log(`2. Create the new stable branch in mypdf.js:`);
console.log(`   cd /workspace/mypdf.js`);
console.log(`   git checkout bleeding-edge`);
console.log(`   git checkout -b ${newVersion}`);
console.log(`   git push origin ${newVersion}\n`);
console.log(`3. Commit the changes:`);
console.log(`   cd /workspace/ngx-extended-pdf-viewer`);
console.log(`   git add build-tools/`);
if (oldMajorMinor !== newMajorMinor) {
  console.log(`   cd /workspace/extended-pdf-viewer-showcase`);
  console.log(`   git add src/app/nav/nav.component.html`);
}
console.log(`   git commit -m "Update stable branch reference from ${oldVersion} to ${newVersion}"`);
console.log(`   git push\n`);
console.log(`4. Test the build:`);
console.log(`   npm run build:base`);
console.log(`   npm run build:lib`);
console.log(`   npm test\n`);
console.log(`⚠️  Note: DO NOT modify mypdf.js/pdfjs.config - it's maintained by Mozilla`);
console.log(`⚠️  Note: DO NOT automatically merge bleeding-edge - handle merge conflicts manually\n`);
