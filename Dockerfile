FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src ./

EXPOSE 8080

CMD [ "node", "app.js" ]