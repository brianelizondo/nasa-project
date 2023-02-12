/** 
* Routes for LAUNCHES 
*/
const express = require("express");
const router = new express.Router();
const { launches } = require("../models/launches");

/** Handle the errors */
const { BadRequestError } = require("../expressError");

/** 
* GET /launches
*   launches, sort by flight number
**/
router.get("/", async function (req, res, next){
    return res.status(200).json(Array.from(launches.values()));
});

module.exports = router;