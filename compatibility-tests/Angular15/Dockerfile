FROM node:16-alpine as node
WORKDIR /app
RUN npm install -g @angular/cli@15
RUN ng new demo
RUN cd demo && ng add ngx-extended-pdf-viewer --defaults --force --skip-confirmation

# The flag --defaults etc. don't work, so we have to overwrite the files
RUN cd demo && rm angular.json && rm -r src/app
COPY . .

RUN cd demo && npm install
RUN cd demo && ng b

RUN ls -alsi
FROM nginx:alpine
COPY --from=node /app/demo/dist/demo/ /usr/share/nginx/html/
COPY --from=node /app/demo/ /usr/share/sourcecode/

