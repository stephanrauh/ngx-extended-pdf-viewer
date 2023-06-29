FROM node:18-alpine as node
WORKDIR /app
RUN npm install -g @angular/cli@16
RUN ng new demo
RUN cd demo && ng add --defaults --force --skip-confirmation ngx-extended-pdf-viewer

# The flag --defaults etc. don't work, so we have to overwrite the files
RUN cd demo && rm angular.json && rm -r src/app
COPY . .

RUN cd demo && npm install
RUN cd demo && ng b

FROM nginx:alpine
COPY --from=node /app/demo/dist/demo/ /usr/share/nginx/html/
COPY --from=node /app/demo/ /usr/share/sourcecode/

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/
