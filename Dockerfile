FROM node:18.20.4-bullseye

WORKDIR /app

COPY . .

RUN npm install

CMD ["node","server.js"]