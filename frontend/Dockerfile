FROM node:16-alpine AS deps

WORKDIR /app

COPY ./ ./

RUN yarn

ENV NODE_ENV production

RUN ls -la

RUN yarn build

CMD yarn start


#FROM nginx:stable-alpine
#COPY  --from=build /app/build /usr/share/nginx/html
#COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ['nginx', '-g', 'daemon off;']
