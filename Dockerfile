FROM nginx:latest

COPY  /dist/ng-keycloack/browser   /usr/share/nginx/html

EXPOSE 80