#stage 1
FROM node:14-alpine as node
WORKDIR /app
# COPY . .
RUN npm install -g @angular/cli@12
RUN ng new demo
RUN cd demo && ng add ngx-extended-pdf-viewer --defaults --skip-confirmation
RUN cd demo && rm angular.json && rm -r src/app
COPY . .

RUN cd demo && npm install
RUN cd demo && ng b
#stage 2
RUN ls -alsi
FROM nginx:alpine
COPY --from=node /app/demo/dist/demo/ /usr/share/nginx/html/
COPY --from=node /app/demo/ /usr/share/sourcecode/

