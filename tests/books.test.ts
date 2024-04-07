const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { Book } = require("../src/models/book.model");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
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

describe("GET /books/:id", () => {
  let bookId;

  beforeEach(async () => {
    const newBook = new Book({
      title: "Test Book",
      author: "Test Author",
      edition: 1,
      isbn: "1234567890",
      status: "available",
    });
    const savedBook = await newBook.save();
    bookId = savedBook._id;
  });

  afterEach(async () => {
    await Book.deleteMany({});
  });

  it("should return a book by id", async () => {
    const response = await request(app).get(`/books/${bookId}`).expect(200);

    expect(response.body.title).toBe("Test Book");
    expect(response.body.author).toBe("Test Author");
    expect(response.body.edition).toBe("1");
    expect(response.body.isbn).toBe("1234567890");
    expect(response.body.status).toBe("available");
  });

  it("should return 404 if book id is not found", async () => {
    const response = await request(app)
      .get("/books/4ddd4b97ae4082f647695fae")
      .expect(404);
    expect(response.body.error).toBe("book not found");
  });
});

describe("PUT /books/:id", () => {
  let bookId;

  beforeEach(async () => {
    const newBook = new Book({
      title: "Test Book",
      author: "Test Author",
      edition: 1,
      isbn: "1234567890",
      status: "available",
    });
    const savedBook = await newBook.save();
    bookId = savedBook._id;
  });

  afterEach(async () => {
    await Book.deleteMany({})
  });

  it("should update a book by id", async () => {
    const updatedData = { title: "Updated Title" };
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.title).toBe(updatedData.title);
  });

  it("should return 404 if book id is not found", async () => {
    const updatedData = { title: "Updated Title" };
    const response = await request(app)
      .put("/books/4ddd4b97ae4082f647695fae")
      .send(updatedData)
      .expect(404);
    expect(response.body.error).toBe("book not found");
  });

  it("should return 400 if request body is missing required fields", async () => {
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send({})
      .expect(400);
    expect(response.body.error).toBe("missing required fields");
  });
});