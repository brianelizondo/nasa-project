/** 
* Routes for LAUNCHES 
*/
const express = require("express");
const router = new express.Router();
const { 
    getAllLaunches,
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
    return res.status(200).json(await getAllLaunches());
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

    try{
        const resp = await addNewLaunch(launch);
        console.log(resp);
        return res.status(201).json(resp);
    } catch (err){
        next(err);
    }
});

/** 
* DELETE /launches/:id
*   set to false the launch data
**/
router.delete("/:id", async function (req, res, next){
    const launchID = Number(req.params.id);

    if(!await checkLaunchID(launchID)){
        return next(new NotFoundError("Launch ID not found"));
    }

    const launchAborted = await abortLaunchByID(launchID);
    if(!launchAborted){
        return next(new BadRequestError("Launch could not be aborted"));
    }

    return res.status(200).json({ aborted: true });
});

module.exports = router;