FROM node:16-alpine AS deps

WORKDIR /app

COPY ./ ./

RUN yarn

ENV NODE_ENV production

RUN ls -la

RUN yarn build

CMD yarn start