# tanssi-binary-api

An API that can be use to run the Tanssi binary and generate chain specs files

## Getting Started

Clone the project and install dependencies

```bash
npm install
```

Since we need to run the Tanssi binary from a Docker image, we'll run the application in a container.

First, we need to build the image.

Locally:

```bash
make build-dev
```

Production:

```bash
make build
```

Finally, we start the container.

Locally (In this case, we mount the file directory as a volume to the container to watch for changes):

```bash
make run-dev
```

Production:

```bash
make run
```
