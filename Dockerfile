FROM node:alpine
WORKDIR /opt/nodecg
RUN apk add git && apk add --no-cache make gcc g++ python3 && npm install --global nodecg-cli && nodecg setup && nodecg install alphaRomeo323/nodecg-discord-utils && nodecg install alphaRomeo323/nodecg-livechat
COPY . /opt/nodecg/bundles/nodecg-alpharomeo-stream/
WORKDIR /opt/nodecg/bundles/nodecg-alpharomeo-stream
RUN npm install
WORKDIR /opt/nodecg
ENTRYPOINT nodecg start
