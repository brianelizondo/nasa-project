/** 
* Routes for LAUNCHES 
*/
const express = require("express");
const router = new express.Router();
const { 
    launches,
    checkLaunchID, 
    addNewLaunch, 
    abortLaunchByID, 
} = require("../models/launches");

/** Handle the errors */
const { BadRequestError, NotFoundError } = require("../expressError");

/** 
* GET /launches
*   launches, sort by flight number
**/
router.get("/", async function (req, res, next){
    return res.status(200).json(Array.from(launches.values()));
});

/** 
* POST /launches
*   add a new launch data
**/
router.post("/", async function (req, res, next){
    const launch = req.body;

    if(!launch.launchDate || !launch.mission || !launch.rocket || !launch.target){
        return next(new BadRequestError("Missing required launch data"));
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return next(new BadRequestError("Invalid launch date"));
    }

    const resp = addNewLaunch(launch);
    return res.status(201).json(resp);
});

/** 
* DELETE /launches/:id
*   set to false the launch data
**/
router.delete("/:id", async function (req, res, next){
    const launchID = Number(req.params.id);

    if(!checkLaunchID(launchID)){
        return next(new NotFoundError("Launch ID not found"));
    }

    const resp = abortLaunchByID(launchID);
    return res.status(200).json(resp);
});

module.exports = router;