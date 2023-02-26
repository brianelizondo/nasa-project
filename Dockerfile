FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY ./server ./server
RUN npm run install-server --omit=dev

COPY ./client ./client
RUN npm run install-client

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 3001