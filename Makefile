SHELL := /bin/bash

APP_NAME = tanssi-binary-api
APP_NAME := $(APP_NAME)

help:
	@grep -E '^[1-9a-zA-Z_-]+:.*?## .*$$|(^#--)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m %-43s\033[0m %s\n", $$1, $$2}' \
	| sed -e 's/\[32m #-- /[33m/'

# Docker #
build:
	docker build -t ${APP_NAME}\
		-f Dockerfile.prod .

build-dev:
	docker build -t ${APP_NAME}\
		-f Dockerfile .

run:
	docker run --platform=linux/amd64 --rm -d -p 3000:3000 ${APP_NAME}

run-dev:
	docker run --platform=linux/amd64 --rm -v .:/app/ -p 3000:3000 ${APP_NAME}

clean: # Clean images
	docker rmi -f ${APP_NAME}

remove: # Remove volumes
	docker volume rm -f ${APP_NAME}
