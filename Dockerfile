FROM node:18-alpine

RUN sh -c "apk add envsubst docker docker-cli-compose"

WORKDIR /app
COPY . /app
RUN node app.js


