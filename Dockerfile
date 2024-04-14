FROM node:18-alpine

RUN sh -c "apk add envsubst docker docker-cli-compose ufw"

WORKDIR /app
COPY . /app


