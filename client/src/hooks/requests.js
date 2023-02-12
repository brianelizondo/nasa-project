// Function to make each request to the back-end api
import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

async function httpRequest(endpoint, data = {}, method = "get"){
    const url = `${API_URL}/${endpoint}`;
    const params = (method === "get") ? data : {};

    try {
        return (await axios({ url, method, data, params })).data;
    } catch (err) {
        console.error("API Error:", err.response);
        let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
    }
}


// TODO: Once API is ready
// Load planets and return as JSON
async function httpGetPlanets(){
    return await httpRequest(`planets/`);
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};