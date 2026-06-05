# syntax=docker/dockerfile:1.6
#
# Angular 19 compatibility harness. See Angular22/Dockerfile for the
# fully-commented version — this file is line-for-line identical except
# for the @angular/cli major pin.
FROM node:22-alpine AS builder
WORKDIR /work
RUN npm install -g @angular/cli@19

RUN ng new --defaults --skip-git --skip-tests demo

COPY ngx-extended-pdf-viewer.tgz /work/ngx-extended-pdf-viewer.tgz
RUN cd demo && ng add --defaults --skip-confirmation /work/ngx-extended-pdf-viewer.tgz --stable --no-example-component

# Schematic now handles assets + budget relaxation; no manual patching needed.
RUN rm -rf demo/src demo/public
COPY common/demo/src /work/demo/src
COPY common/demo/public /work/demo/public

RUN cd demo && npm install && ng build --configuration production

FROM nginx:alpine
COPY --from=builder /work/demo/dist/demo/browser /usr/share/nginx/html
COPY common/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
