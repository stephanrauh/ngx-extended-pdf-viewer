# Backporting a security fix to an old release line

`build-tools/hotfix/` holds the scripts for putting a security fix onto a release line that has
long since moved on — the case `MAINTENANCE-RELEASE.md` does *not* cover, because that document
assumes the branch already exists and already has today's tooling on it.

The concrete case they were written for is **CVE-2026-16633 on the 27 line**, and the constants in
them are that case's. They are kept in the repo because the *shape* of the job repeats, and because
a security backport should be auditable after the fact: the scripts are the record of what was done.

> **This is an exception.** `SECURITY.md` says only the latest version gets security updates, and
> that policy stands. The 27 backport was a one-off decision, not a new promise.

## Why a 27 backport is not just "check out the tag and patch it"

Three things make it awkward, and every step below exists because of one of them:

1. **The release scripts build from *branch tips*.** Checking out `6.1` or `bleeding-edge` in the
   fork today gives you a completely different engine than the one that shipped as 27.0.0. The
   commit actually behind a release has to be looked up, not assumed.
2. **The 27 line is on pdf.js 5.6**, the fix was written against 6.2. Files have moved between the
   two, so the cherry-picks conflict — expectedly, not alarmingly.
3. **The SBOM tooling is 29.0.0-era.** The 27 tag has none of it: no `generate-sbom.js`, no
   schemas, no `ajv`, no `pdfjs-provenance.json`.

## The scripts

### `00-inspect-27.js` — reconnaissance, read-only

```bash
node build-tools/hotfix/00-inspect-27.js [version]     # defaults to 27.0.0
```

Writes nothing, checks nothing out. It answers the questions the plan is blocked on: which engine
the release bundles (read from the **npm tarball**, since committed constants can be stale), whether
that engine is even affected, which fork commit is behind each channel, whether the fix is already
present, which files the fix touches and whether they still exist at that commit, what the tag lacks
compared to `main`, and which version currently owns npm's `latest` dist-tag.

What it found for 27.0.0:

| | stable | bleeding-edge |
|---|---|---|
| engine | 5.6.1113 | 5.6.1112 |
| fork commit | `57349b52` (on `origin/5.6.205`) | `32a32f52` |
| affected? | yes (≥ 5.6.83) | yes |

### `01-prepare-27.js` — branches and cherry-picks

```bash
node build-tools/hotfix/01-prepare-27.js stable
node build-tools/hotfix/01-prepare-27.js bleeding-edge
```

One channel per run — a conflict leaves the fork mid-cherry-pick, and two half-finished branches at
once would be a mess. It creates `27.0.x` in the library (with `git branch`, so `main` stays checked
out) and `ngx-27.0.x` / `ngx-27.0.x-bleeding-edge` in the fork, then cherry-picks the two fix commits
with `-x` so each records where it came from.

It does **not** push, tag, build or publish, and it prints the exact commands to undo everything.

Guards worth knowing about:

- refuses to run on a dirty fork, or with a cherry-pick already in progress
- **re-verifies the base commit produces the expected engine version**, recomputed the way gulp does
  it — a wrong base commit stops the run rather than founding a maintenance branch on it
- reads the fix commit hashes from `main`'s `pdfjs-provenance.json` instead of hardcoding them
- skips commits already applied, so re-running after a manual resolution is safe. Note this must
  test for the `cherry picked from commit …` trailer: a cherry-pick makes a *new* commit, so
  `merge-base --is-ancestor` alone will never find the original and would re-apply the fix forever.

The fork branches are named `ngx-27.0.x…` rather than `27.0.x…` on purpose: `find-fork-commit.js`
treats anything matching `\d+\.\d+` as a pdf.js release line, and these are not one.

## Resolving the conflict (what was actually done for 27)

Only one conflict, in `src/display/xfa_layer.js`, and only in the import block. On the 5.6 line:

- `shadow` is in `src/shared/util.js` — same as 6.x
- `SVG_NS` is still in `src/display/display_utils.js`; it only moved into `shared/util.js` later
- `src/display/page_viewport.js` **does not exist yet**, so upstream's `PageViewport` import is
  dropped — it was only there for a typedef, and this file's typedef already points at
  `display_utils`

giving:

```js
import { shadow } from "../shared/util.js";
import { SVG_NS } from "./display_utils.js";
```

The rest of both commits applied cleanly, including into `setAttributes` (the `intent` parameter it
relies on already existed on 5.6) and `web/pdf_scripting_manager.js`.

**Do not run `eslint --fix` on the file.** The 5.6 branch predates the current prettier config and
was never lint-clean — `xfa_layer.js` had 9 pre-existing errors before the backport. A `--fix` run
reformats 168 lines of untouched code, still leaves errors behind, and buries a security change in
formatting churn. Keep upstream's formatting and judge only the changed lines (this is the same rule
the workspace `CLAUDE.md` states for the fork generally).

Result on both branches: `xfa_layer.js` +169/−6, `pdf_scripting_manager.js` +19 — identical to the
upstream fix, no churn.

## Building the patched 27 engine

The fork's `node_modules` is installed for whatever branch you normally sit on. A 5.6-era branch
needs different build dependencies (`postcss-dir-pseudo-class`, among others), so `npx gulp generic`
fails at gulpfile load until you re-run `npm install` **on the 27 branch** — and switching back to
`bleeding-edge` needs another install. A git worktree for the 27 branches avoids that, at the cost
of pointing `updateMozillasPdfViewer.js` (which hardcodes `../../../mypdf.js`) somewhere else.

Verified after the backport: `npx gulp generic` succeeds on both branches, and both fixes are
present in `build/generic/web/viewer.mjs` (`_allowedRichTextStyles`, `#objectIds`).

Numbers the SBOM needs, all derived rather than assumed:

| | stable (`ngx-27.0.x`) | bleeding-edge (`ngx-27.0.x-bleeding-edge`) |
|---|---|---|
| engine before | 5.6.1113 | 5.6.1112 |
| **engine after the 2 fixes** | **5.6.1115** | **5.6.1114** |
| upstream release | v5.6.205 | v5.6.205 |

The engine version is `versionPrefix` + commits since `baseVersion`, so **the patched engine gets a
new build number** — 27.0.1 does not ship the same engine string as 27.0.0, and the provenance file
must say so. The upstream release comes from `git describe --tags --match 'v*'`, which resolves both
27 branches to `v5.6.205`; that is what the `purl` and CPE must name.

## The SBOM half: generate it on `main`, don't backport the toolchain

Porting `generate-sbom.js`, the CycloneDX schemas, `ajv` and the release config onto a branch built
for an older Angular is a lot of surface for no benefit. `generate-sbom.js` already honours
`NGX_SBOM_LIB_DIR` — that is how `test-sbom.js` drives it against a fixture — so the 27 documents can
be produced **by the generator on `main`** and committed to the 27 branch as static artifacts.

That keeps the branch free of new dependencies while the documents still come out of the same tested
generator that ships on `main`.

### `03-sbom-for-27.js` — the documents

```bash
node build-tools/hotfix/03-sbom-for-27.js [--version 27.0.1]
```

Assembles a staging directory that looks like the 27 library package (its `package.json` read from
the `27.0.x` branch, a generated `pdfjs-provenance.json`, and placeholder worker files named exactly
what the real build will produce), then points **`main`'s `generate-sbom.js`** at it via
`NGX_SBOM_LIB_DIR` under `NGX_SBOM_STRICT=1`. Output lands in `build-tools/hotfix/out-27/`; nothing
else is touched, and copying the results onto the branch is a separate, deliberate step.

Every fact in the provenance is derived, not assumed: the engine version recomputed the gulp way,
the upstream release from `git describe`, and — importantly — the fix commit ids remapped to the
**cherry-picked commits on the 27 branches**, found via the `cherry picked from commit …` trailer.
The originals from `main` are not in this engine and recording them would be a lie.

Result for 27.0.1:

```
stable        purl=pkg:npm/pdfjs-dist@5.6.205  build=5.6.1115
bleedingEdge  purl=pkg:npm/pdfjs-dist@5.6.205  build=5.6.1114
VEX: CVE-2026-16633  resolved_with_pedigree  -> affects both bundles
```

**The staging run only proves internal consistency.** It cannot prove the documents match bundles
that have not been built yet — the placeholders exist purely to satisfy the generator's existence
check. The real verification is step 4: after `npm run build:base` on the branch, re-run
`validate-sbom.js` against the actual `projects/ngx-extended-pdf-viewer/` with `NGX_SBOM_STRICT=1`.

## Step 4 — putting it on the branch, and three traps

The documents go onto `27.0.x` by hand (there is no generator there to run):

```bash
git checkout 27.0.x
cp build-tools/hotfix/out-27/*.json projects/ngx-extended-pdf-viewer/
```

plus a version bump to 27.0.1 in `projects/ngx-extended-pdf-viewer/package.json` — `validate-sbom.js`
checks that the SBOM and the package agree on the version, so they have to be bumped together.

**Trap 1 — the bundle destination is an exact string match.** `updateMozillasPdfViewer.js` decides
between `assets/` and `bleeding-edge/` with `BRANCH === 'bleeding-edge'`. A branch called
`ngx-27.0.x-bleeding-edge` therefore counts as *stable*, and a build from it would silently
overwrite `assets/` with the wrong engine. The script's one escape hatch is a **detached HEAD on a
tag whose name contains `bleeding-edge`**, so the 27 build uses the release tags:

```bash
git tag ngx-extended-pdf-viewer-27.0.1            ngx-27.0.x
git tag ngx-extended-pdf-viewer-27.0.1-bleeding-edge ngx-27.0.x-bleeding-edge
git checkout --detach ngx-extended-pdf-viewer-27.0.1-bleeding-edge   # -> bleeding-edge/
git checkout ngx-27.0.x                                              # -> assets/
```

Those tag names are the convention `find-fork-commit.js` looks for first, so they are needed anyway.

**Trap 2 — `sbom.json` is gitignored.** On `main` that is right: it is generated during the build.
On this branch it is a committed artifact, so `.gitignore` needs an explicit negation
(`!projects/ngx-extended-pdf-viewer/sbom.json`). Note `vex.json` is *not* ignored on the 27 line —
that ignore line was added later — so the two files behave differently. Check both.

**Trap 3 — `ng-package.json` decides what ships.** The three documents must be added to its `assets`
array or ng-packagr will not copy them into the published package, and the SBOM will exist only in
git. `main`'s list is the reference:

```json
"assets": ["changelog.md", "NOTICE", "sbom.json", "vex.json", "pdfjs-provenance.json", "assets", "bleeding-edge"]
```

## Before publishing

- `latest` on npm must not move. At the time of writing `latest` = 28.1.2 and `rc` = 29.0.0-rc.4, so
  a 27 publish needs an explicit `npmDistTag` in `release-config.json` (e.g. `"v27"`).
- Extend the affected range of
  [GHSA-w9hm-4m3m-fxmm](https://github.com/stephanrauh/ngx-extended-pdf-viewer/security/advisories/GHSA-w9hm-4m3m-fxmm)
  to cover the 27 line once the patch release is out.
- Add the patched 27 version to the `SECURITY.md` entry for CVE-2026-16633.
- Return the fork to your normal working branch (`bleeding-edge` or `6.1`) — a stray checkout is how
  `build:base` ends up overwriting the wrong bundle.
