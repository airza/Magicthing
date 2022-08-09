FROM node:latest
WORKDIR /www/
COPY ./app/package.json .
RUN npm install
COPY ./app/ .
ENV NODE_ENV=production
EXPOSE 9229
EXPOSE 80
CMD ["npm","run","dev"]