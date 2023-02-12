/** 
* Routes for PLANETS 
*/
const express = require("express");
const router = new express.Router();
const planets = require("../models/planets");

/** 
* GET /planets
*   Returns all planets
**/
router.get("/", async function (req, res, next){
    return res.status(200).json(planets);
});

module.exports = router;