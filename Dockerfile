FROM node:latest AS builder
ARG NG_CLI_ANALYTICS="false"
RUN mkdir -p /app
WORKDIR /app
RUN npm install @angular/cli

FROM builder
COPY . /app
CMD npx ng serve --host 0.0.0.0
