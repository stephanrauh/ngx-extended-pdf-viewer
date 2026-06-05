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
