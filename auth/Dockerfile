FROM node:slim
ENV NODE_ENV development
WORKDIR /app
COPY . .
RUN npm i
CMD [ "npm", "start" ]