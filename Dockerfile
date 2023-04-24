FROM node:latest AS builder

RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build --  --output-path=dist --output-hashing=all

FROM nginx:stable-alpine
EXPOSE 80
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
