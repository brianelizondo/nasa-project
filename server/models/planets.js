/*
* PLANETS model 
*/
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

const planets = [];

// Function to check if a planet is habitable (return true or false)
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 
      && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
} 

// Read the file line by line and check if the planet is habitable and push to the planets array
fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data)) {
            planets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    }
);


module.exports = {
    planets
};