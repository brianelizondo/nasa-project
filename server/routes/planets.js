/** 
* Routes for PLANETS 
*/
const express = require("express");
const router = new express.Router();
const { getAllPlanets } = require("../models/planets");

/** 
* GET /planets
*   Returns all planets
**/
router.get("/", async function (req, res, next){
    return res.status(200).json(await getAllPlanets());
});

module.exports = router;