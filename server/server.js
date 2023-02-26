/** 
* Server for NASA Project App
*/
const app = require('./app');
const PORT = process.env.PORT || 3001;
const { connectToMongoDB } = require("./db");
const { loadPlanetsData } = require("./models/planets");

// start connect to MongoBD database
connectToMongoDB();

app.listen(PORT, function () {
    loadPlanetsData();
    console.log(`Server starting on port ${PORT}`);
});