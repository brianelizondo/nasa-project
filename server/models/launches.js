/*
* LAUNCHES model 
*/

const launches = new Map();
const flightNumber = 1;

/** Handle the errors */
const {
    BadRequestError,
    NotFoundError,
} = require("../expressError");



module.exports = {
    launches,
};