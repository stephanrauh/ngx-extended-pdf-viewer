# syntax=docker/dockerfile:1.6
#
# Angular 22 compatibility harness. Builds a fresh Angular 22 app, installs
# the locally-built ngx-extended-pdf-viewer tarball via `ng add` (also tests
# the schematic), copies the shared demo source, builds for production, and
# serves it through nginx on port 80.
FROM node:22-alpine AS builder
WORKDIR /work
RUN npm install -g @angular/cli@22

# 1. Generate a vanilla Angular 22 app. We override main.ts / src/app
#    afterwards so the bootstrap style and routing come from our own demo,
#    not from whatever scaffold the active Angular CLI version produces.
RUN ng new --defaults --skip-git --skip-tests demo

# 2. Install the locally-built library via the schematic. The tarball is
#    copied in by `test.sh` after running `npm run build:base && build:lib`
#    and `npm pack` from dist/ngx-extended-pdf-viewer.
COPY ngx-extended-pdf-viewer.tgz /work/ngx-extended-pdf-viewer.tgz
RUN cd demo && ng add --defaults --skip-confirmation /work/ngx-extended-pdf-viewer.tgz

# 2b. Patch angular.json with the library assets. The library's ng-add
#     schematic only knows about the legacy `@angular-devkit/build-angular:browser`
#     builder; Angular 17+ uses `@angular/build:application` so the schematic
#     bails ("Assets may not be configured correctly"). Until the schematic
#     is updated upstream we add the assets entry by hand.
RUN cd demo && node -e "                                                       \
  const fs = require('fs');                                                    \
  const c = JSON.parse(fs.readFileSync('angular.json', 'utf8'));               \
  const p = Object.values(c.projects)[0];                                      \
  const target = (p.architect || p.targets).build;                             \
  target.options.assets = target.options.assets || [];                         \
  target.options.assets.push({                                                 \
    glob: '**/*',                                                              \
    input: 'node_modules/ngx-extended-pdf-viewer/assets',                      \
    output: '/assets/'                                                         \
  });                                                                          \
  /* ngx-extended-pdf-viewer is large; default 1 MB initial budget fails. */   \
  const prod = (target.configurations || {}).production;                       \
  if (prod && Array.isArray(prod.budgets)) {                                   \
    prod.budgets = prod.budgets.map((b) =>                                     \
      b.type === 'initial'                                                     \
        ? { ...b, maximumWarning: '5mb', maximumError: '10mb' }                \
        : b);                                                                  \
  }                                                                            \
  fs.writeFileSync('angular.json', JSON.stringify(c, null, 2));                \
  console.log('Patched angular.json: lib assets + relaxed initial budget');    \
"

# 3. Overlay the shared demo source on top of `ng new`'s + `ng add`'s
#    output. We nuke and replace `src/` and `public/` entirely so the demo
#    is identical across Angular versions — otherwise we'd inherit whatever
#    the active scaffold produces (Angular 22 renamed `app.module.ts` →
#    `app-module.ts`, made components standalone by default, etc.). The
#    schematic's example component lives under src/ and is discarded here;
#    package.json / angular.json / tsconfig from `ng new` are preserved.
RUN rm -rf demo/src demo/public
COPY common/demo/src /work/demo/src
COPY common/demo/public /work/demo/public

# 4. Production build.
RUN cd demo && npm install && ng build --configuration production

FROM nginx:alpine
COPY --from=builder /work/demo/dist/demo/browser /usr/share/nginx/html
COPY common/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
