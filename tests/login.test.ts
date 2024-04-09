const request = require("supertest");
const app = require("../src/app");
const usersService = require("../src/services/users.service");
const { disconnect } = require("../src/db/db");

jest.mock("../src/services/users.service", () => ({
  getUserByRegistrationAndPassword: jest.fn(),
}));

afterAll(async () => {
  disconnect();
})

describe("POST /login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if missing required fields", async () => {
    const response = await request(app).post("/login").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("missing required fields");
  });

  it("should return 401 if user not found or incorrect password", async () => {
    usersService.getUserByRegistrationAndPassword.mockResolvedValue(null);
    const response = await request(app)
      .post("/login")
      .send({ registration: "user123", password: "password123" });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("user not found or incorrect password");
  });

  it("should return 200 with user info and token if login successful", async () => {
    const mockUser = {
      fullName: "John Doe",
      registration: "user123",
    };

    usersService.getUserByRegistrationAndPassword.mockResolvedValue(mockUser);
    const response = await request(app)
      .post("/login")
      .send({ registration: "user123", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("login successful");
    expect(response.body.user).toEqual({
      fullName: mockUser.fullName,
      registration: mockUser.registration,
      token: expect.any(String),
    });
  });
});
