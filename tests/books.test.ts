const request = require("supertest");
const app = require("../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
});

afterAll(async () => {
  await mongoServer.stop();
});

beforeEach(async () => {
  const { Book } = require("../src/models/book.model");
  await Book.deleteMany({});
});

describe("GET /books", () => {
  it("should return status 200", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
  });
});

describe("POST /books", () => {
  it("should create a new book", async () => {
    const bookData = {
      title: "Sample Book",
      author: "John Doe",
      edition: 1,
      isbn: "123456",
      status: "available",
    };

    const response = await request(app)
      .post("/books")
      .send(bookData)
      .expect(201);

    expect(response.body.title).toBe(bookData.title);
    expect(response.body.author).toBe(bookData.author);
  });
});
