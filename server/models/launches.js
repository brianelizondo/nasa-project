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

function checkLaunchID(launchID){
    return launches.has(launchID);
}

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

function abortLaunchByID(launchID){
    const launchAborted = launches.get(launchID);
    launchAborted.upcoming = false;
    launchAborted.success = false;

    return launchAborted;
}

module.exports = {
    launches,
    checkLaunchID, 
    addNewLaunch,
    abortLaunchByID,
};