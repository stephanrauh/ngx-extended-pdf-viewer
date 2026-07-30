# Release Process

This document describes the two-stage release process for ngx-extended-pdf-viewer with npm trusted publishing and provenance.

## Overview

The release process has been split into two stages:

1. **Local preparation** (`npm run release:lib`) - Bumps versions, commits, and pushes changes
2. **CI publishing** (`npm run do-release:lib`) - Builds and publishes to npm with provenance

This separation enables:

- ✅ npm trusted publishing with provenance attestations
- ✅ Automated builds in CI with proper permissions
- ✅ Secure token handling via GitHub Actions OIDC
- ✅ Reproducible builds with verification checks

## Prerequisites

### 1. Configure npm for Trusted Publishing

You need to configure your npm package for trusted publishing:

1. Go to https://www.npmjs.com/package/ngx-extended-pdf-viewer/access
2. Navigate to "Publishing Access" → "Trusted Publishers"
3. Add GitHub Actions as a trusted publisher:
   - Provider: GitHub
   - Organization: stephanrauh
   - Repository: ngx-extended-pdf-viewer
   - Workflow: publish.yml
   - Environment: (leave blank or set to 'production')

### 2. GitHub Secrets

No npm token needs to be stored in GitHub Secrets when using trusted publishing! The workflow uses OIDC (OpenID Connect) to authenticate directly with npm.

However, you need:

- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
- Access to the mypdf.js repository (if private, configure PAT)

## Release Workflow

### Step 1: Prepare Release Locally

Run the preparation script locally:

```bash
npm run release:lib
```

This script will:

1. ✓ Check that all changes are committed (clean git status)
2. ✓ Increment the version number in `projects/ngx-extended-pdf-viewer/package.json`
3. ✓ Update version in mypdf.js (both 6.1 and bleeding-edge branches)
4. ✓ Commit all changes with message "bumped the version number to X.Y.Z"
5. ✓ Push commits to both repositories
6. ✓ Create and push git tag (e.g., `25.6.1`)
7. ✓ Create tags in mypdf.js repository

### Step 2: CI Publishes Automatically

The GitHub Actions workflow triggers automatically when you push a tag:

1. Workflow detects the new tag (e.g., `25.6.1`)
2. Checks out both ngx-extended-pdf-viewer and mypdf.js
3. Verifies tag version matches package.json
4. Runs `npm run do-release:lib` which:
   - Builds base library from mypdf.js bleeding-edge
   - Verifies bleeding-edge assets
   - Builds base library from mypdf.js 6.1
   - Verifies stable assets
   - Generates the SBOM (Software Bill of Materials) — after the engines, because it
     describes them; see "SBOM and pdf.js provenance" below
   - Builds Angular library
   - Verifies dist output and version
   - Publishes to npm with `--provenance` flag
5. Creates GitHub Release with artifacts

## SBOM and pdf.js provenance

We bundle a fork of pdf.js, so `pdfjs-dist` never appears in `package.json` and no dependency
scanner can see the PDF engine on its own (#3244). Two generated files, both published inside
the npm package and attached to the GitHub release, fix that:

| File | Written by | Contents |
| --- | --- | --- |
| `projects/ngx-extended-pdf-viewer/pdfjs-provenance.json` | `build-tools/base-library/update-pdfjs-provenance.js` | per bundle: upstream pdf.js release + commit, fork branch + commit, bundled build version |
| `projects/ngx-extended-pdf-viewer/sbom.json` | `build-tools/generate-sbom.js` | CycloneDX 1.6, with a `purl`/`cpe` for CVE matching and a `pedigree` block declaring the fork |

The provenance file is refreshed automatically by `1-build-base-library.js`, once per engine
build — the fork's checked-out branch decides which bundle's entry is updated, the same rule
`updateMozillasPdfViewer.js` uses. So a release, which builds both branches, ends up with both
entries current. To backfill an entry without checking that branch out:

```bash
node ./build-tools/base-library/update-pdfjs-provenance.js --ref 6.1
```

`generate-sbom.js` (`npm run build:sbom`) turns the provenance into CycloneDX. It runs as part of
`2-build-library.js`, right before ng-packagr packs, so `dist/` can never ship an SBOM describing
an older engine.

`pdfjs-provenance.json` is checked in; `sbom.json` is git-ignored build output, like the engine
bundles themselves.

### How we know the SBOM is valid

Three layers, each catching what the one before it can't:

1. **Every generation self-validates.** `generate-sbom.js` ends by invoking `validate-sbom.js`,
   which checks the document against the vendored CycloneDX 1.6 JSON schema (see
   `build-tools/schema/README.md`) *and* against the bundle on disk. A failure is non-zero, so an
   invalid SBOM is never left behind — and since the SBOM is generated during `build:lib` and the
   release, a broken one fails the release rather than shipping.
2. **`npm run test:sbom`** (`build-tools/test-sbom.js`) drives the whole pipeline against a
   fixture — no pdf.js build needed, runs in under a second on a fresh checkout, and is part of
   the PR workflow. It asserts the output is schema-valid, carries the purl/cpe/pedigree a
   scanner needs, is byte-for-byte reproducible, and that the staleness guards actually fire.
3. **`npm run validate:sbom`** checks the real, currently generated `sbom.json` on demand.

Two deliberate design points that the tests pin down. The SBOM's `metadata.timestamp` is the
commit date of the newest bundled engine rather than "now", and the serial number is derived from
the package name and version — so the file only changes when its contents change. That keeps
local rebuilds from dirtying the working tree and makes releases reproducible. And
`generate-sbom.js` exits 89 when `pdfjs-provenance.json` disagrees with the `pdf.worker-*.mjs`
actually present, so a stale provenance file cannot produce an SBOM that misstates the engine.

| Command | Purpose |
| --- | --- |
| `npm run build:sbom` | regenerate `sbom.json` (self-validating) |
| `npm run validate:sbom` | validate the current `sbom.json` |
| `npm run test:sbom` | fixture-based regression test of the pipeline (CI) |

## Verification Checklist

The CI script includes multiple verification steps:

- ✅ **Bleeding-edge assets** - Verifies 9 critical files exist and are >= 700 KB each:
  - `pdf.sandbox-{version}-es5.mjs`, `pdf.sandbox-{version}.min.mjs`, `pdf.sandbox-{version}.mjs`
  - `pdf.worker-{version}-es5.mjs`, `pdf.worker-{version}.min.mjs`, `pdf.worker-{version}.mjs`
  - `viewer-{version}-es5.mjs`, `viewer-{version}.min.mjs`, `viewer-{version}.mjs`
- ✅ **Stable (6.1) assets** - Verifies same 9 critical files exist and are >= 700 KB each
- ✅ Dist folder is created
- ✅ package.json exists in dist
- ✅ Version in dist matches expected version
- ✅ **No malicious lifecycle scripts** - Checks dist package.json for suspicious install/uninstall hooks
- ✅ All builds complete without errors

The version is dynamically read from `mypdf.js/build/version.json` for each branch.
Each file's size is logged during verification for audit purposes.

If any verification fails, the publish will abort with a specific error code.

## Error Codes

| Code  | Description                                  |
| ----- | -------------------------------------------- |
| 51    | Git commit state check failed                |
| 52    | SBOM generation failed                       |
| 53    | Base library build failed                    |
| 54    | Angular library build failed                 |
| 55    | npm publish failed                           |
| 57    | Version number increase failed               |
| 58-65 | Git commit/push failed in various repos      |
| 66-80 | Git operations failed (checkout, push, tags) |
| 81    | Bleeding-edge assets verification failed     |
| 82    | Stable assets verification failed            |
| 83    | Dist folder not created                      |
| 84    | package.json missing from dist               |
| 85    | Version mismatch in dist                     |
| 86    | Suspicious lifecycle scripts found in dist   |

## Rollback

If you need to rollback a release:

```bash
# Delete the local tag
git tag -d X.Y.Z

# Delete the remote tag
git push origin :refs/tags/X.Y.Z

# If already published to npm
npm deprecate ngx-extended-pdf-viewer@X.Y.Z "Version retracted due to [reason]"
```

This runs the original `5-release-library.js` which does everything in one script.

## Testing the Workflow

To test the workflow without publishing:

1. Create a test tag locally: `git tag -a 25.6.0-test.1 -m "Test release"`
2. Push the tag: `git push origin --tags`
3. Monitor the workflow at https://github.com/stephanrauh/ngx-extended-pdf-viewer/actions
4. The workflow will run but you can add `--dry-run` to the publish command in the CI script

## Benefits of This Approach

1. **Provenance**: npm package includes cryptographic proof of where and how it was built
2. **Security**: No long-lived npm tokens stored in GitHub Secrets
3. **Auditability**: Complete build logs and attestations stored on npm
4. **Separation of Concerns**: Version management (local) vs. building/publishing (CI)
5. **Verification**: Multiple checks ensure quality before publishing
6. **Transparency**: Users can verify the package came from the official GitHub repo

## Troubleshooting

### Tag pushed but workflow didn't trigger

- Check that the tag format matches the pattern in `.github/workflows/publish.yml`
- Verify workflows are enabled in repository settings

### Workflow runs but publish fails

- Check that npm trusted publishing is configured correctly
- Verify the workflow has `id-token: write` permission
- Review the workflow logs for specific error codes

### Version mismatch errors

- Ensure `release:lib` completed successfully
- Verify the tag name matches the version in package.json
- Check that all git commits were pushed

### mypdf.js checkout fails

- Verify the repository path is correct
- Check if mypdf.js is private (may need PAT token)
- Ensure both repositories are at the correct branches
