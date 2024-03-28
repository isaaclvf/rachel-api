const request = require("supertest");
const app = require("../src/app");

const expectedData = require("../src/data/books")

describe("GET /books", () => {
  it("should return status 200", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
  });

  it("should return the expected data", async () => {
    const response = await request(app).get("/books");
    expect(response.body).toEqual(expectedData);
  })
});
