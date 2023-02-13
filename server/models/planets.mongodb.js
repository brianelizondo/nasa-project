/*
* PLANETS  MongoDB model  
*/
const mongoose = require("mongoose");
const { Schema } = mongoose;

// planets schema
const planetsSchema = new Schema({
    keplerName: {
        type: String,
        require: true
    }
});

// Planet model connected with planetsSchema
const Planet = mongoose.model('Planet', planetsSchema);

module.exports = Planet;