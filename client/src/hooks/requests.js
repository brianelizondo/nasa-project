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
    const resp = await httpRequest(`planets/`);
    return resp.planets;
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
    const resp = await httpRequest(`launches/`);
    return resp.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
    try{
        const resp = await httpRequest(`launches/`, launch, "post");
        return resp;
    } catch(err){
        return { success: false };
    }
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