FROM node:14.15.4-alpine

ENV WORKDIR /usr/src

WORKDIR $WORKDIR

ADD package.json yarn.lock $WORKDIR/

RUN apk update && \
    apk add git
RUN yarn install --network-timeout 20000000
