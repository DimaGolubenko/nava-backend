FROM node:18.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY yarn.lock .

RUN npm install

COPY . .