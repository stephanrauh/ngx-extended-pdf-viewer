#!/usr/bin/env bash
# Cross-Angular compatibility runner for Angular 21.
#
# Pre-builds the library from local source (pdf.js + Angular wrapper),
# packs it to a .tgz so the Dockerfile installs the *about-to-be-published*
# artifact (not whatever npm currently has), then builds the Docker image,
# serves the demo on a host port, runs the Playwright spec against it, and
# tears everything down.
set -euo pipefail

ANGULAR_VERSION=21
IMAGE_TAG="ngx-pdf-compat-ng${ANGULAR_VERSION}"
CONTAINER_NAME="${IMAGE_TAG}-run"
HOST_PORT="${COMPAT_PORT:-4221}"

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${HERE}/../.." && pwd)"
COMPAT_ROOT="${REPO_ROOT}/compatibility-tests"

# 1. Build the library locally (pdf.js core + Angular wrapper).
#    Set SKIP_LIBRARY_BUILD=1 to reuse the previous build — useful when
#    iterating on the test harness without changing library source.
if [ "${SKIP_LIBRARY_BUILD:-0}" != "1" ]; then
  echo "==> Building library from source"
  cd "${REPO_ROOT}"
  npm run build:base
  npm run build:lib
else
  echo "==> Skipping library build (SKIP_LIBRARY_BUILD=1)"
fi

# 2. Pack the built library.
echo "==> Packing tarball"
cd "${REPO_ROOT}/dist/ngx-extended-pdf-viewer"
TARBALL=$(npm pack --silent)
mv "${TARBALL}" "${HERE}/ngx-extended-pdf-viewer.tgz"
echo "    ${HERE}/ngx-extended-pdf-viewer.tgz"

# 3. Build the Docker image — context is the compatibility-tests/ root so
#    the Dockerfile can `COPY common/...` and the tarball.
echo "==> Docker build"
cp "${HERE}/ngx-extended-pdf-viewer.tgz" "${COMPAT_ROOT}/ngx-extended-pdf-viewer.tgz"
cd "${COMPAT_ROOT}"
docker build -f "Angular${ANGULAR_VERSION}/Dockerfile" -t "${IMAGE_TAG}" .
rm -f "${COMPAT_ROOT}/ngx-extended-pdf-viewer.tgz"
rm -f "${HERE}/ngx-extended-pdf-viewer.tgz"

# 4. Run the container and wait for it to serve.
echo "==> Starting container on :${HOST_PORT}"
docker rm -f "${CONTAINER_NAME}" >/dev/null 2>&1 || true
docker run --rm -d --name "${CONTAINER_NAME}" -p "${HOST_PORT}:80" "${IMAGE_TAG}"
trap 'docker stop "${CONTAINER_NAME}" >/dev/null 2>&1 || true' EXIT
for _ in $(seq 1 30); do
  if curl -sf "http://localhost:${HOST_PORT}/" >/dev/null; then
    break
  fi
  sleep 1
done

# 5. Sync the showcase POM into the compat tree. We can't import it via a
#    relative cross-project path: the POM also imports `@playwright/test`,
#    and resolving it from the showcase's node_modules causes Playwright to
#    abort with a "loaded twice" error. Copying the file means both the
#    spec and the POM resolve the SAME `@playwright/test` installation.
echo "==> Syncing POM from showcase"
SHOWCASE_POM="${REPO_ROOT}/../extended-pdf-viewer-showcase/e2e/poms/pdf-viewer.page.ts"
COMPAT_POM_DIR="${COMPAT_ROOT}/playwright/poms"
mkdir -p "${COMPAT_POM_DIR}"
cp "${SHOWCASE_POM}" "${COMPAT_POM_DIR}/pdf-viewer.page.ts"

# 6. Run Playwright against the live container.
echo "==> Playwright"
cd "${COMPAT_ROOT}/playwright"
[ -d node_modules ] || npm install
COMPAT_BASE_URL="http://localhost:${HOST_PORT}" \
COMPAT_ANGULAR_VERSION="${ANGULAR_VERSION}" \
  npx playwright test
