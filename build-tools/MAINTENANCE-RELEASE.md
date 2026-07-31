# Publishing a maintenance release of an older version

How to ship a patch (usually a security backport) on a release line that is no longer the current
one — e.g. publishing `28.1.2` while `main` is on 29.x.

For a normal release from `main`, use [RELEASE-PROCESS.md](./RELEASE-PROCESS.md) instead. This
document only covers the old-version case, which the standard process does **not** handle.

---

## Why `npm run release:lib` is not enough

Four things break when the target is not the newest version:

1. **The release scripts build from a branch _tip_, not from what shipped.** `5-2-release-library-ci.js`
   runs `git checkout <branch>` in the fork, and `publish.yml` clones `stephanrauh/pdf.js` without a
   `ref:` at all. Check out `6.0` or `bleeding-edge` today and you get today's engine — a newer
   viewer, a newer major, silently folded into a patch release.
2. **Old tags predate the tooling that makes a maintenance release possible.** Any tag older than
   28.1.1 has `0` occurrences of `NGX_ASSETS_FOLDER` and knows nothing about `release-config.json`.
   A branch cut from such a tag inherits the _old_ scripts and has to be updated first — this is
   step 2 below, and it is the step that is easiest to forget.
3. **`npm publish` would hijack the `latest` dist-tag.** The tag is derived from the version string,
   so any non-prerelease version is published as `latest`. Publishing `28.1.2` after `29.0.0` is out
   would make every fresh `npm install` resolve to the _older_ major.
4. **`increase-version-number.js` bumps the last component only.** That is correct on a `28.1.x`
   branch (`28.1.1` → `28.1.2`), but it means the branch must already carry the right version.

---

## Step 0 — Find out which fork commit that version was built from

```bash
cd ngx-extended-pdf-viewer
node build-tools/release/find-fork-commit.js 28.0.4
```

Reports, per bundle (`assets/` and `bleeding-edge/`), the engine version and the exact `mypdf.js`
commit it came from. It resolves in four ways, falling back in order, and always verifies the answer
by recomputing the engine version from the commit itself:

| #   | Strategy                                                     | Applies when                                         |
| --- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 1   | fork tag `ngx-extended-pdf-viewer-<version>[-bleeding-edge]` | normal case — tags exist back to ~4.x                |
| 2   | the `bumped the version number to <version>` commit          | tag missing but the release ran through `5-1`        |
| 3   | binary search for the commit whose build number matches      | tag _and_ bump commit missing (release done by hand) |
| 4   | sweep of all fork tags for a matching engine version         | the branch was deleted after the line was retired    |

Useful flags:

```bash
--from-npm            # take the engine versions from the published tarball instead of from git
--branches a,b,c      # restrict the search
--json                # machine-readable
--engine 6.0.1168     # look up an engine version directly, no library version involved
```

**Use `--from-npm` whenever the release was not produced by a clean `5-1` run.** git records the
engine versions in `pdf-default-options.ts`, but that file is only trustworthy if the release script
regenerated it. For `28.1.1` it is wrong: git claims `6.0.1172` for bleeding-edge, while the tarball
actually shipped `6.0.1174` in _both_ bundles. `--from-npm` reads the real `pdf.worker-<version>.mjs`
file names out of the tarball and warns when the two sources disagree.

**Why every answer is verified rather than simply trusted.** A fork tag is not proof on its own: it
is created after the build, so it can sit a commit further along than the commit that was actually
built. `25.0.0` is a live example — its tag `ngx-extended-pdf-viewer-25.0.0` computes to `5.4.796`,
but the tarball on npm ships `5.4.795`. The script therefore recomputes the engine version from each
candidate and only accepts one that matches what the release recorded, falling through to the next
strategy otherwise. That is also why a tag can be present and the search still runs.

Exit code `94` means a channel could not be resolved — that happens only when neither a tag nor any
surviving branch contains the commit (e.g. the bleeding-edge half of `20.0.2`, whose `4.2` branch is
gone). If that happens, the history for that bundle is genuinely lost; build from the closest tag you
can find and say so in the changelog.

### How the engine version maps to a commit

`gulpfile.mjs` computes the engine version as `versionPrefix` + _the number of commits since_
`baseVersion`, both read from `pdfjs.config`. So `6.0.1174` means "the 1174th commit after the base
commit, on a branch whose prefix is `6.0.`". Both values change over the fork's history, which is why
the script reads `pdfjs.config` from each candidate commit rather than from the branch tip.

---

## Step 1 — Library maintenance branch

One branch per release line, named `<major>.<minor>.x`:

```bash
cd ngx-extended-pdf-viewer
git fetch --all --tags
git checkout -b 28.1.x 28.1.1          # branch off the tag you are patching
```

If the branch already exists (`28.1.x` does), just check it out.

## Step 2 — Port the maintenance tooling onto that branch

**Do not skip this on a newly created branch.** On any tag older than 28.1.1 these files are missing
or predate the maintenance support:

```bash
git checkout main -- \
  build-tools/5-1-prepare-release.js \
  build-tools/5-2-release-library-ci.js \
  build-tools/base-library/updateMozillasPdfViewer.js \
  build-tools/release/release-config.js \
  build-tools/release/find-fork-commit.js \
  build-tools/MAINTENANCE-RELEASE.md
```

Take them from `main` — that is the canonical copy. Do **not** copy
`build-tools/release/release-config.json`; that one is per-branch and you write it in a moment.

(`git checkout <branch> -- <paths>` aborts as a whole if _any_ path is unknown on that branch, so
all of these must exist there first — it will not partially apply.)

What they add:

- `updateMozillasPdfViewer.js` — `NGX_ASSETS_FOLDER` overrides the destination folder, which is
  otherwise derived from the fork's checked-out branch name. Also keys the `gulp types` step off the
  destination rather than the branch.
- `release-config.js` — reads the per-line settings below and validates them.
- `5-1-prepare-release.js` — on a maintenance line, builds _both_ bundles from the stable fork
  branch and leaves the fork's `bleeding-edge` branch untouched, uncommitted and untagged. Adds
  `SKIP_E2E=1`.
- `5-2-release-library-ci.js` — same, for CI, plus the dist-tag pin.

Then write this line's `build-tools/release/release-config.json`. **This is the only file that should
differ between branches** — the scripts themselves are identical everywhere, which is what keeps the
cherry-pick above conflict-free:

```json
{
  "forkStableBranch": "5.6.205",
  "forkBleedingEdgeBranch": null,
  "npmDistTag": "v27-lts"
}
```

| Key                      | Meaning                                                                   |
| ------------------------ | ------------------------------------------------------------------------- |
| `forkStableBranch`       | fork branch holding this line's engine — step 0 tells you which one       |
| `forkBleedingEdgeBranch` | branch for the `bleeding-edge/` bundle, or `null` for a maintenance line  |
| `npmDistTag`             | dist-tag to publish under, or `null` to derive it from the version string |

For comparison, `main` carries `"6.1"` / `"bleeding-edge"` / `null`.

`forkBleedingEdgeBranch: null` is what switches the scripts into maintenance mode: both bundles get
built from `forkStableBranch`, and the fork's `bleeding-edge` branch is never checked out, committed
or tagged. A bad config fails fast with exit code `95` rather than silently building the wrong thing.

## Step 3 — Fork maintenance branch

The fork branch must exist **and be pushed**, because CI checks it out by name.

If the line's branch still exists and still points at the right engine (`6.0` does for 28.1.x), use
it. Otherwise create one from the commit found in step 0:

```bash
cd ../mypdf.js
git fetch --all --tags
git checkout -b 28.0.x-engine <commit-from-step-0>
```

## Step 4 — Apply the fix

Cherry-pick from upstream or from a newer branch, always with `-x` so the provenance trailer
`(cherry picked from commit <sha>)` is recorded — `update-pdfjs-provenance.js` and the SBOM pedigree
rely on it to detect that an advisory has been addressed:

```bash
git cherry-pick -x <upstream-sha> [<upstream-sha-2> ...]
git push -u origin 28.0.x-engine
```

Verify the delta is only what you intended before going further:

```bash
git diff --stat ngx-extended-pdf-viewer-<previous-version>..HEAD
```

## Step 5 — Version number and changelog

On the library branch, set the version you are about to release **minus one patch** — `5-1` bumps it.

```bash
# projects/ngx-extended-pdf-viewer/package.json  →  "version": "28.1.1"   to release 28.1.2
```

Add the changelog entry (`projects/ngx-extended-pdf-viewer/changelog.md`) and update `SECURITY.md`
if this is a security fix. Commit everything — `5-1` refuses to run on a dirty tree.

## Step 6 — Prepare the release

```bash
cd ngx-extended-pdf-viewer
SKIP_E2E=1 SKIP_COMPAT=1 npm run release:lib
```

- `SKIP_E2E=1` is **required** on a maintenance branch. The showcase is a separate repo that always
  tracks the newest API, so it cannot compile against an older library — you get
  `NG8002: Can't bind to 'supportsDownloading'` and similar. It is not a real failure.
- `SKIP_COMPAT=1` only if Docker is unavailable; CI runs the full matrix anyway.

This bumps the version, rebuilds both bundles from `STABLE_BRANCH`, commits, pushes and tags.

**The branch and the tag must both reach GitHub** — the workflow triggers on the tag, and the tag
must be reachable from a pushed branch. This is what failed during the 28.1.1 release:

```bash
git push -u origin 28.1.x
git push origin --tags
```

**Push the fork before the ngx tag.** The workflow clones `mypdf.js` and builds the engine from the
branch tip, so if the fork's bump commit is not there yet, CI builds the previous engine while the
tagged `pdf-default-options.ts` already names the new one — and every worker request in the
published package 404s. Nothing downstream notices: `5-2` checks the bundle against the version it
just built, and the SBOM checks the provenance against the files on disk, so both agree with each
other while being wrong. `5-1-prepare-release.js` gets the order right; if you push by hand, do
`mypdf.js` first and the ngx tag last.

## Step 7 — Check the npm dist-tag

Already handled if you set `npmDistTag` in step 2. Users then install the line explicitly
(`npm i ngx-extended-pdf-viewer@v28-lts`) and `latest` keeps pointing at the current major.

`NGX_NPM_TAG` in the environment overrides the config for a one-off.

If you only realise afterwards:

```bash
npm dist-tag add ngx-extended-pdf-viewer@29.0.0 latest
npm dist-tag add ngx-extended-pdf-viewer@28.1.2 v28-lts
```

## Step 8 — Verify what was actually published

Never assume. Install the published package and diff it against the previous release:

```bash
npm pack ngx-extended-pdf-viewer@28.1.2
npm pack ngx-extended-pdf-viewer@28.1.1
# compare file inventories, then compare file by file
```

What to check:

- **File inventory identical**, apart from anything you deliberately added.
- **Both bundles carry the engine you expect** — `ls assets/pdf.worker-*.mjs bleeding-edge/pdf.worker-*.mjs`.
  On a maintenance release both must show the _same_ version.
- **The compiled library is unchanged** apart from version strings. Compare with `cmp` first and only
  fall back to a version-normalised diff for the files that differ:
  `LC_ALL=C sed -E 's/[0-9]+\.[0-9]+\.[0-9]{3,4}/X/g'`. `LC_ALL=C` matters because ~90 of the 881
  packaged files are binary (`wasm/*.wasm`, `standard_fonts/*.ttf`, `*.pfb`) and `sed` otherwise
  aborts on them with "illegal byte sequence". Make the version pattern wide enough — a regex like
  `6\.0\.117[0-9]` silently misses `6.0.1169` and turns identical files into phantom differences.
- **The fix is present** in both bundles and **absent** from the previous version. Grep for a
  distinctive identifier from the patch.

Differences that are expected and harmless:

- the build hash, and the per-build random `INTERNAL_EVT` UUID (regenerated on each of the two CI
  build passes, so the two bundles differ by exactly those lines even when the engine is identical)
- Babel renumbering `_ref2`/`_ref3`/… after an insertion
- webpack reordering core-js polyfills — check they were re-added, not dropped

---

## Avoiding this next time

**Tag at the start of a line, not only at release time.** The fork tags
`ngx-extended-pdf-viewer-<version>` and `…-bleeding-edge` are what makes step 0 instant; the fallback
searches exist only because they occasionally go missing. `5-1-prepare-release.js` creates them
automatically — the gaps come from releases done by hand.

**If you had to publish by hand, tag afterwards.** Reconstruct the commit with
`find-fork-commit.js <version> --from-npm`, then:

```bash
cd ../mypdf.js
git tag -a ngx-extended-pdf-viewer-28.1.1 -m "ngx-extended-pdf-viewer 28.1.1" <commit>
git tag -a ngx-extended-pdf-viewer-28.1.1-bleeding-edge -m "ngx-extended-pdf-viewer 28.1.1" <commit>
git push origin --tags
```

(For 28.1.1 both tags point at the same commit `f22a3f58` — that release shipped one engine in both
bundles.)

**Keep retired fork branches.** Deleting them is what makes strategy 3 fail; the `20.0.2`
bleeding-edge bundle is unreachable today for exactly that reason.

**Port the step-2 fixes to `main`.** They are still missing there, so the next maintenance branch cut
from a 29.x tag will hit the same wall.
