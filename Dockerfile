FROM node:latest AS development

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

CMD npm run docker:dev

