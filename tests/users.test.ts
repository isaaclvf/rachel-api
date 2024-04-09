const request = require("supertest");
const app = require("../src/app");
const usersService = require("../src/services/users.service");
const loansService = require("../src/services/loans.service");

jest.mock("../src/services/users.service", () => ({
  getAllUsers: jest.fn(),
  createUser: jest.fn(),
  getUserByRegistration: jest.fn(),
  updateUser: jest.fn(),
}));

jest.mock("../src/services/loans.service", () => ({
  getLoansByUserId: jest.fn(),
}));

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /users", () => {
    it("should return 200 and list of users", async () => {
      const mockUsers = [{ registration: "user1", type: "admin" }];
      usersService.getAllUsers.mockResolvedValue(mockUsers);

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });

    it("should handle errors", async () => {
      usersService.getAllUsers.mockRejectedValue(new Error("Test error"));

      const response = await request(app).get("/users");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Test error");
    });
  });

  describe("POST /users", () => {
    it("should return 201 and created user", async () => {
      const mockUser = { registration: "user1", type: "admin" };
      usersService.createUser.mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/users")
        .send({ registration: "user1", type: "admin", password: "password" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });

    it("should handle errors", async () => {
      usersService.createUser.mockRejectedValue(new Error("Test error"));

      const response = await request(app)
        .post("/users")
        .send({ registration: "user1", type: "admin", password: "password" });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Test error");
    });
  });

  describe("GET /users/:registration", () => {
    it("should return 200 and user information with loans", async () => {
      const mockUser = {
        _id: "user_id",
        fullName: "Test User",
        profilePictureUrl: "http://example.com/avatar.png",
      };
      const mockLoan = {
        _id: "loan_id",
        user: "user_id",
        book: "book_id",
        loanDate: "2024-04-08T23:49:54.671Z", // Convert to string
        dueDate: "2024-04-08T23:49:54.671Z", // Convert to string
        status: "active",
      };
      usersService.getUserByRegistration.mockResolvedValue(mockUser);
      loansService.getLoansByUserId.mockResolvedValue([mockLoan]);

      const response = await request(app).get("/users/123");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        fullName: mockUser.fullName,
        profilePictureUrl: mockUser.profilePictureUrl,
        loanedBooks: [[mockLoan]],
      });
    });

    it("should handle errors", async () => {
      usersService.getUserByRegistration.mockRejectedValue(
        new Error("Test error")
      );

      const response = await request(app).get("/users/123");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Test error");
    });
  });

  describe("PUT /users/:registration", () => {
    it("should update user information and return 200", async () => {
      const mockUser = {
        _id: "user_id",
        fullName: "Test User",
        profilePictureUrl: "http://example.com/avatar.png",
        birthdate: "1990-01-01",
        email: "test@example.com",
        phone: "123456789",
        gender: "male",
        cpf: "12345678901",
        address: "123 Test St",
      };
      const mockUpdate = {
        fullName: "Updated User",
        email: "updated@example.com",
      };

      usersService.getUserByRegistration.mockResolvedValue(mockUser);
      usersService.updateUser.mockResolvedValue({
        ...mockUser,
        ...mockUpdate,
      });

      const response = await request(app).put("/users/123").send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(
        "user information updated successfully"
      );
      expect(response.body.user).toEqual(expect.objectContaining(mockUpdate));
    });

    it("should handle missing fields and return 400", async () => {
      const mockUpdate = {
        // Missing fields
      };

      const response = await request(app).put("/users/123").send(mockUpdate);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("missing required fields");
    });

    it("should handle errors and return 500", async () => {
      usersService.getUserByRegistration.mockRejectedValue(
        new Error("test error")
      );

      const response = await request(app)
        .put("/users/123")
        .send({ email: "test@mail.com" });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("test error");
    });
  });
});
