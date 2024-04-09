const request = require("supertest");
const app = require("../src/app");
const userService = require("../src/services/users.service");
const reservationService = require("../src/services/reservation.service");

jest.mock("../src/services/users.service");
jest.mock("../src/services/reservation.service");

const mockUser = {
  _id: "user_id",
  registration: "123",
  fullName: "Test User",
  profilePictureUrl: "http://example.com/avatar.png",
};

const mockReservation = {
  _id: "reservation_id",
  user: "user_id",
  books: [
    {
      _id: "book_id",
      title: "Book Title",
      author: "Book Author",
    },
  ],
};

userService.getUserByRegistration.mockResolvedValue(mockUser);
const populate = jest.fn().mockResolvedValue([mockReservation]);
reservationService.getReservationByUserId.mockReturnValue({ populate });

describe("GET /users/:registration/reserved", () => {
  it("should return 200 and list of reserved books for a user", async () => {
    const response = await request(app).get("/users/123/reserved");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("reservedBooks");
    expect(Array.isArray(response.body.reservedBooks)).toBe(true);
    expect(populate).toHaveBeenCalledWith("books");
  });

  it("should return 404 if user with registration not found", async () => {
    userService.getUserByRegistration.mockResolvedValueOnce(null);
    const response = await request(app).get("/users/invalid/reserved");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "user with given registration not found",
    });
  });
});

describe("POST /users/:registration/reserve", () => {
  it("should return 200 and message if reservation is successful", async () => {
    const bookId = "bookId123";
    userService.getUserByRegistration.mockResolvedValue(mockUser);
    reservationService.createReservation.mockResolvedValue(mockReservation);

    const response = await request(app)
      .post(`/users/${mockUser.registration}/reserve`)
      .send({ bookId });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("reservation successful");
  });

  it("should return 404 if user with registration not found", async () => {
    userService.getUserByRegistration.mockResolvedValueOnce(null);

    const response = await request(app)
      .post("/users/invalid/reserve")
      .send({ bookId: "bookId123" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "user not found" });
  });
});
