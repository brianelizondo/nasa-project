/*
* PLANETS model 
*/
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const Planet = require("./planets.mongodb");

/** Handle the errors */
const {
    BadRequestError
} = require("../expressError");

// Function to get all planets
async function getAllPlanets(){
    return await Planet.find({}, { '_id': 0, '__v': 0 });
}

// Function to check if a planet is habitable (return true or false)
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 
      && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
} 

// Read the file line by line and check if the planet is habitable and push to the planets array
function loadPlanetsData(){
	return new Promise((resolve, reject) => {
		fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
			.pipe(parse({
				comment: '#',
				columns: true,
			}))
			.on('data', async (data) => {
				if(isHabitablePlanet(data)) {
					// code line to use with temporal memory storage
					// planets.push(data);

					// code to use MongoDB model/database
					await savePlanet(data);
				}
			})
			.on('error', (err) => {
				console.error(err);
				reject(err);
			})
			.on('end', async () => {
				resolve();
			}
		);
  	});
}

// function tu save each planet
async function savePlanet(planet){
    try{
        await Planet.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        });
    } catch (err){
        // console.error(`The planet could not be added: ${err}`)
        return new BadRequestError(`The planet could not be added: ${err}`);
    }
}


module.exports = {
    getAllPlanets,
    loadPlanetsData
};