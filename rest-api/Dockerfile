FROM node:12

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["node", "app.js"]