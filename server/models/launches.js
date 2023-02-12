/*
* LAUNCHES model 
*/

const launches = new Map();
let latestFlightNumber = 0;

/** Handle the errors */
const {
    BadRequestError,
    NotFoundError,
} = require("../expressError");

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ["test1", "test2"],
        success: true,
        upcoming: true,
    }));

    return launches.get(latestFlightNumber);
}

module.exports = {
    launches,
    addNewLaunch,
};