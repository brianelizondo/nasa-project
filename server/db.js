/**
* Connect to MongoDB using mongoose
*/
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;

const mongoose = require('mongoose');
// alert success connection
mongoose.connection.once('open', () => {
    console.log("MongoDB connection is ready!");
});
// start MongoDB connection
async function connectToMongoDB(){
    await mongoose.connect(MONGODB_URL);
}
// close MongoDB connection
async function disconnectMongoDB(){
    await mongoose.disconnect();
}

module.exports = {
    connectToMongoDB,
    disconnectMongoDB
}