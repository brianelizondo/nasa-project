/*
* LAUNCHES model 
*/
const Launch = require("./launches.mongodb");
const Planet = require("./planets.mongodb");

/** Handle the errors */
const {
    BadRequestError,
    NotFoundError,
} = require("../expressError");

// Function to get all launches
async function getAllLaunches(){
    const launches = await Launch.find({}, { '_id': 0, '__v': 0 });
    return launches;
}

// Function to get the new flight number
async function getNewFlightNumber(){
    const lastFligthNumber =  await Launch.findOne({}).sort({ flightNumber: -1 });
    return lastFligthNumber.flightNumber + 1;
}

async function checkLaunchID(launchID){
    // code line to use with temporal memory storage
    // return launches.has(launchID);

    // code to use MongoDB model/database
    return await Launch.findOne({ flightNumber: launchID }).exec() ? true : false;
}

async function addNewLaunch(launch){
    // code lines to use with temporal memory storage
    // latestFlightNumber++;
    // launches.set(latestFlightNumber, Object.assign(launch, {
    //     flightNumber: latestFlightNumber,
    //     customers: ["test1", "test2"],
    //     success: true,
    //     upcoming: true,
    // }));
    // return launches.get(latestFlightNumber);
    
    // code to use MongoDB model/database
    // check if the planet name exist
    const checkPlanet = await Planet.findOne({ keplerName: launch.target });
    if(!checkPlanet){
        throw new BadRequestError("Planet target not found");
    }

    const newLaunch = {
        ...launch,
        flightNumber: await getNewFlightNumber(),
        customers: ["test1", "test2"],
        success: true,
        upcoming: true,
    }

    const launchCreated = await Launch.create(newLaunch)
        .then((launch) => {
            return launch;
        })
        .catch((err) => {
            console.error(err);
        });

    return launchCreated;
}

async function abortLaunchByID(launchID){
    // code lines to use with temporal memory storage
    // const launchAborted = launches.get(launchID);
    // launchAborted.upcoming = false;
    // launchAborted.success = false;
    // return launchAborted;

    // code to use MongoDB model/database
    const launchAborted = await Launch.updateOne({ flightNumber: launchID }, {
            upcoming: false,
            success: false
        });

    return launchAborted.matchedCount === 1 && launchAborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    checkLaunchID, 
    addNewLaunch,
    abortLaunchByID,
};