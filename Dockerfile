# PRODUCTION TARGET
FROM node:22-alpine AS build

WORKDIR /documentation/
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# DEPLOY
FROM nginx:stable-alpine AS deploy

COPY --from=build /documentation/dist/ /usr/share/nginx/html/docs/
