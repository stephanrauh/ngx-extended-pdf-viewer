# syntax=docker/dockerfile:1.6
#
# Angular 20 compatibility harness. See Angular22/Dockerfile for the
# fully-commented version — this file is line-for-line identical except
# for the @angular/cli major pin.
FROM node:22-alpine AS builder
WORKDIR /work
RUN npm install -g @angular/cli@20

RUN ng new --defaults --skip-git --skip-tests demo

COPY ngx-extended-pdf-viewer.tgz /work/ngx-extended-pdf-viewer.tgz
RUN cd demo && ng add --defaults --skip-confirmation /work/ngx-extended-pdf-viewer.tgz

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

RUN rm -rf demo/src demo/public
COPY common/demo/src /work/demo/src
COPY common/demo/public /work/demo/public

RUN cd demo && npm install && ng build --configuration production

FROM nginx:alpine
COPY --from=builder /work/demo/dist/demo/browser /usr/share/nginx/html
COPY common/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
