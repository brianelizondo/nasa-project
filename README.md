# nasa-project
NASA Mission Control API

This is a personal version of the NASA project from [Complete NodeJS Developer in 2023 Course: Zero to Mastery](https://www.udemy.com/course/complete-nodejs-developer-zero-to-mastery).

## Getting Started

1. Use a Node.js server.
2. Created a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online.
3. Created a `server/.env` file with a `MONGODB_URL` property set to the MongoDB cluster connection string.

## Running the Tests

To run any automated tests, run `npm test`. This will: 
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server`

## CI in GitHub actions

1. Created the ci.yml file to set the GitHub actions workflow
2. Updated the launches/planets model to run in the pipeline tests
3. Updated the launch test file to run pipeline tests
4. Updated the ci.yml file to use MongoDB server in GitHub actions pipeline tests
5. CI versions used to pipeline testing:
   * Ubuntu latest
   * Repository access (actions/checkout@v3)
   * Node.js version 14.x / 16.x (actions/setup-node@v3)
   * MongoDB version 4.4 / 5.0 (supercharge/mongodb-github-action@1.9.0)