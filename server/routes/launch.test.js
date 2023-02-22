const request = require("supertest");
const app = require("../app");
const { 
    connectToMongoDB,
    disconnectMongoDB
} = require("../db");

beforeAll(async () => {
    await connectToMongoDB();
});

afterAll(async () => {
    await disconnectMongoDB();
});

describe("Test GET /launches", () =>{
    test("It should respond with 200 status code", async () => {
        const response = await request(app).get("/launches");
        expect(response.statusCode).toBe(200);
    });
    test("It should respond with launches array", async () => {
        const response = await request(app).get("/launches");
        expect(response.body).toEqual(expect.any(Array));
    });
});


const launchTest = {
    launchDate: "January 1, 2023",
    mission: "Mission Test",
    rocket: "Rocket Test",
    target: "Kepler-62 f"
}
let lastFlightAdded = 0;

describe("Test POST /launches", () => {
    test("It should respond with 201 status code and launch created object", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchTest);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            mission: launchTest.mission,
            rocket: launchTest.rocket,
            target: launchTest.target,
            launchDate: expect.any(String),
            flightNumber: expect.any(Number),
            customers: expect.any(Array),
            success: true,
            upcoming: true
        }));
        // update the last flight added
        lastFlightAdded = response.body.flightNumber;
    });

    test("It should respond with 400 status code if has missing data", async () => {
        delete launchTest.launchDate;
        const response = await request(app)
            .post("/launches")
            .send(launchTest);
        expect(response.statusCode).toBe(400);
    });

    test("It should respond with 400 status code if launch date is invalid", async () => {
        launchTest.launchDate = "test";
        const response = await request(app)
            .post("/launches")
            .send(launchTest);
        expect(response.statusCode).toBe(400);
    });
}); 

describe("Test DELETE /launches/:id", () => {
    test("It should respond with 200 status code and launch deleted object", async () => {
        const response = await request(app)
            .delete(`/launches/${lastFlightAdded}`)
            .send(launchTest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ aborted: true });
    });

    // test("It should respond with 404 status code if id is invalid", async () => {
    //     const response = await request(app).delete("/launches/abc");
    //     expect(response.statusCode).toBe(404);
    // });

    test("It should respond with 404 status code if id not exist", async () => {
        const response = await request(app).delete("/launches/0");
        expect(response.statusCode).toBe(404);
    });
}); 