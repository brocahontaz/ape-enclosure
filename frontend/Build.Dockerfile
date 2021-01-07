# Build-stage
FROM node:alpine as build-stage

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

RUN yarn run build

# Production

FROM nginx:stable

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY ./ape.conf /etc/nginx/nginx.conf