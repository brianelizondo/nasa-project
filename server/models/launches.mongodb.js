/*
* LAUNCHES MongoDB model 
*/
const mongoose = require("mongoose");
const { Schema } = mongoose;

/** Handle the errors */
const {
    BadRequestError,
    NotFoundError,
} = require("../expressError");

// launches schema
const launchesSchema = new Schema({
    flightNumber: {
        type: Number,
        require: true,
        default: 1,
        unique: true,
        min: 1
    },
    launchDate: {
        type: Date,
        require: true
    },
    mission: {
        type: String,
        require: true,
    },
    rocket: {
        type: String,
        require: true,
    },
    target: {
        type: String,
        require: true,
    },
    customers: {
        type: [ Array ],
        require: true,
    },
    succes: {
        type: Boolean,
        require: true,
        default: true
    },
    upcoming: {
        type: Boolean,
        require: true,
        default: true
    }
});

// Launch model connected with launchesSchema
const Launch = mongoose.model('Launch', launchesSchema);

