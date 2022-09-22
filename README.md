## Description

Movie list application backend with [Nest](https://github.com/nestjs/nest) framework TypeScript and MongoDB.

## Installation

```bash
$ npm install
```

## Running the app

Before running the app, create a .env file in the root directory and declare a variable `MONGO_URL` with a valid MongoDB credential.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```