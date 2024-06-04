# PRODUCTION TARGET
FROM node:18 AS build

COPY ./ /documentation/
WORKDIR /documentation/
RUN yarn install
RUN yarn run build

# DEPLOY
FROM nginx:stable-alpine AS deploy

COPY --from=build /documentation/build/ /usr/share/nginx/html/docs/
