/** 
* Express app for NASA Project App
*/
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

/** Function to handle express errors */
const { NotFoundError } = require("./expressError");

/** Routes */
const planetsRoutes = require("./routes/planets");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

/** Routes directories */
app.use("/planets", planetsRoutes);



/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next){
    return next(new NotFoundError());
});
  
/** Generic error handler */
app.use(function (err, req, res, next){
    // the default status is 500 Internal Server Error
    const status = err.status || 500;
    const message = err.message;
    // set the status and alert the user
    return res.status(status).json({
        error: { message, status },
    });
});

// Export app to start server from server.js
module.exports = app;