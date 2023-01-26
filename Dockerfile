FROM node:alpine
WORKDIR /opt/nodecg
RUN apk add git make libtool autoconf && npm install --global nodecg-cli && nodecg setup && nodecg install alphaRomeo323/nodecg-discord-utils
COPY . /opt/nodecg/bundles/nodecg-alpharomeo-stream/
ENTRYPOINT nodecg start
