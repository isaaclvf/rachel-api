const request = require("supertest");
const app = require("../src/app");

describe("GET /books", () => {
  it("should return status 200", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
  });
});

describe('POST /books', () => {
  it('should create a new book', async () => {
    const bookData = {
      title: 'Sample Book',
      author: 'John Doe',
    };

    const response = await request(app)
      .post('/books')
      .send(bookData)
      .expect(201);

    expect(response.body.title).toBe(bookData.title);
    expect(response.body.author).toBe(bookData.author);
  });
});
