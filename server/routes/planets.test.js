const request = require("supertest");
const app = require("../app");


describe("Test GET /planets", () => {
    test("It should respond with 200 status code", async () => {
        const response = await request(app).get("/planets");
        expect(response.statusCode).toBe(200);
    });
    test("It should respond with planets array", async () => {
        const response = await request(app).get("/planets");
        expect(response.body).toEqual({ planets: expect.any(Array)});
    });
});