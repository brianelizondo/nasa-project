const request = require("supertest");
const app = require("./app");

describe("test app file", () => {
    test("Not found for site 404", async () => {
        const response = await request(app).get("/no-such-path");
        expect(response.statusCode).toEqual(404);
    });
});