/*
* PLANETS model 
*/
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

/** Handle the errors */
const {
    BadRequestError,
    NotFoundError,
} = require("../expressError");

const planets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 
      && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
} 

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