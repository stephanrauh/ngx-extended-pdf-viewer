#!/usr/bin/env bash
# Runs the compat harness against every supported Angular major in turn.
# Each version uses its own port and Docker image; failures are reported
# at the end with a one-line summary per version.
#
# Builds the library once at the start, then re-uses the tarball across
# all versions via SKIP_LIBRARY_BUILD=1. Set REBUILD_PER_VERSION=1 if you
# want each version to start from a fresh build (slower, rarely needed).
set -uo pipefail

VERSIONS=(${COMPAT_VERSIONS:-19 20 21 22})

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${HERE}/.." && pwd)"

# Build the library once up front (unless caller already did).
if [ "${SKIP_LIBRARY_BUILD:-0}" != "1" ]; then
  echo "==> Building library from source (once)"
  cd "${REPO_ROOT}"
  npm run build:base
  npm run build:lib
fi

# Provision the Playwright browser once up front, using the harness's OWN
# pinned Playwright (compatibility-tests/playwright). Every Angular runner
# shares this single install, and each minor of Playwright requires a
# specific Chromium build — so the browser MUST be fetched through this
# local binary, not a floating `npx playwright` (which resolves a different
# version and installs the wrong build, leaving launches to fail with
# "Executable doesn't exist at .../chromium_headless_shell-XXXX").
# `playwright install` is idempotent and near-instant when the build is
# already cached. Set SKIP_BROWSER_INSTALL=1 on CI images that pre-bake it.
if [ "${SKIP_BROWSER_INSTALL:-0}" != "1" ]; then
  echo "==> Installing Playwright browser (matching the harness's pinned version)"
  cd "${HERE}/playwright"
  [ -d node_modules ] || npm install
  npm run install:browsers
fi

declare -a RESULTS
declare -a FAILED

for V in "${VERSIONS[@]}"; do
  echo
  echo "########################################"
  echo "#  Angular ${V}"
  echo "########################################"
  if SKIP_LIBRARY_BUILD=1 bash "${HERE}/Angular${V}/test.sh"; then
    RESULTS+=("Angular ${V}: PASS")
  else
    RESULTS+=("Angular ${V}: FAIL")
    FAILED+=("${V}")
  fi
done

echo
echo "========================================"
echo "Compat matrix summary"
echo "========================================"
for r in "${RESULTS[@]}"; do
  echo "  ${r}"
done

if [ "${#FAILED[@]}" -ne 0 ]; then
  echo
  echo "FAILED: ${FAILED[*]}"
  exit 1
fi
