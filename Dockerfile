FROM --platform=linux/amd64 moondancelabs/container-chain-simple-template:latest as binary
FROM --platform=linux/amd64 ubuntu:22.04

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 18.0.0

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
ENV NODE_ENV development

COPY --from=binary /container-chain-template-simple/container-chain-template-simple-node /binary/container-chain-template-simple-node

WORKDIR /app

COPY package*.json /app/

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "run", "dev"]