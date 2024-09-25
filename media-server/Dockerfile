FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

RUN apk add --no-cache ffmpeg

RUN cp /usr/bin/ffmpeg ./

COPY . .

CMD ["node", "index.js"]