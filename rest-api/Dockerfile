FROM node:12

WORKDIR /backend/

COPY package*.json /backend/

RUN npm install

COPY . /backend

EXPOSE 8080
CMD ["npm", "start"]