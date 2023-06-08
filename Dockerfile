FROM node:18-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD [ "pnpm", "start:dev" ]