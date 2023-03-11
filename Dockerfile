FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

EXPOSE 5173

CMD npm run docker:dev

