FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY src ./

EXPOSE 8080

CMD [ "node", "app.js" ]