const request = require("supertest");
const app = require("../app");


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
    target: "Planet Test"
}

describe("Test POST /launches", () => {
    test("It should respond with 201 status code and launch created object", async () => {
        const response = await request(app)
            .post("/launches")
            .send(launchTest);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            mission: launchTest.mission,
            rocket: launchTest.rocket,
            target: launchTest.target,
            launchDate: expect.any(String),
            flightNumber: expect.any(Number),
            customers: expect.any(Array),
            success: true,
            upcoming: true
        });
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
            .delete("/launches/1")
            .send(launchTest);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            mission: launchTest.mission,
            rocket: launchTest.rocket,
            target: launchTest.target,
            launchDate: expect.any(String),
            flightNumber: expect.any(Number),
            customers: expect.any(Array),
            success: false,
            upcoming: false
        });
    });

    test("It should respond with 404 status code if id is invalid", async () => {
        const response = await request(app).delete("/launches/NaN");
        expect(response.statusCode).toBe(404);
    });

    test("It should respond with 404 status code if id not exist", async () => {
        const response = await request(app).delete("/launches/0");
        expect(response.statusCode).toBe(404);
    });
}); 