// Function to make each request to the back-end api
import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_URL || "";

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
    return resp;
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
        return { success: true };
    } catch(err){
        return { success: false };
    }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
    try{
        const resp = await httpRequest(`launches/${id}`, id, "delete");
        return { success: true };
    } catch(err){
        return { success: false };
    }
}

export {
    httpGetPlanets,
    httpGetLaunches,
    httpSubmitLaunch,
    httpAbortLaunch,
};