FROM node:alpine
WORKDIR /opt/nodecg
RUN apk add --no-cache --virtual .builddeps git make gcc g++ python3 && npm install --global nodecg-cli pnpm && nodecg setup && npm uninstall --global nodecg-cli
WORKDIR /opt/nodecg/bundles
RUN git clone --depth 1 https://github.com/alphaRomeo323/nodecg-discord-utils.git && git clone --depth 1 https://github.com/alphaRomeo323/nodecg-livechat.git
WORKDIR /opt/nodecg/bundles/nodecg-discord-utils
RUN pnpm install
WORKDIR /opt/nodecg/bundles/nodecg-livechat
RUN pnpm install
COPY . /opt/nodecg/bundles/nodecg-alpharomeo-stream/
WORKDIR /opt/nodecg/bundles/nodecg-alpharomeo-stream
RUN pnpm install
WORKDIR /opt/nodecg
RUN apk del --purge .builddeps
ENTRYPOINT node index.js