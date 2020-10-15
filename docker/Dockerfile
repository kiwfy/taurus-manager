FROM node:8-alpine

RUN apk --no-cache upgrade && apk add --no-cache tini

RUN mkdir /usr/src

WORKDIR /usr/src

EXPOSE 8201

CMD ["npm", "start"]
