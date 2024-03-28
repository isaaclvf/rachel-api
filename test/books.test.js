const request = require("supertest");
const app = require("../src/app");

describe("GET /books", () => {
  it("should return status 200", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
  });
});
