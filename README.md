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