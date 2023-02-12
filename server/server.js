/** 
* Server for NASA Project App
*/
const app = require('./app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log(`Server starting on port ${PORT}`);
});