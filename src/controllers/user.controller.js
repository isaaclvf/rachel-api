const { Router } = require("express");
const userService = require("../services/user.service");
const reservationService = require("../services/reservation.service");
const loansService = require("../services/loans.service");
const booksService = require("../services/books.service");
const userRouter = Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const users = await userService.getAllUsers(page, limit);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { registration, type, password } = req.body;
    const newUser = await userService.createUser(registration, type, password);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:registration", async (req, res, next) => {
  try {
    const registration = req.params.registration;

    const user = await userService.getUserByRegistration(registration);
    const loans = await loansService.getLoansByUserId(user._id);

    return res.status(200).json({
      fullName: user.fullName,
      profilePictureUrl: user.profilePictureUrl,
      loanedBooks: [loans],
    });
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:registration", async (req, res, next) => {
  const update = req.body;
  const registration = req.params.registration;
  try {
    if (
      !update.phone ||
      !update.cpf ||
      !update.email ||
      !update.gender ||
      !update.birthdate ||
      !update.address
    ) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const user = await userService.getUserByRegistration(registration);

    const allowedFields = [
      "fullName",
      "profilePictureUrl",
      "birthdate",
      "email",
      "phone",
      "gender",
      "cpf",
      "address",
    ];

    const filteredUpdates = Object.keys(update)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = update[key];
        return obj;
      }, {});

    const updatedUser = await userService.updateUser(user._id, filteredUpdates);

    res.status(200).json({
      message: "user information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:registration/books", async (req, res, next) => {});

userRouter.get("/:registration/reserved", async (req, res, next) => {
  try {
    const registration = req.params;

    const user = await userService.getUserByRegistration(registration);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with given registration not found" });
    }

    const reservations = await reservationService
      .getReservationByUserId(user._id)
      .populate("books");

    const reservedBooks = reservations.map((reservation) => ({
      bookId: reservation.books._id,
      title: reservation.books.title,
      author: reservation.books.author,
      //dueDate: reservation.books.dueDate,
    }));

    return res.status(200).json({ reservedBooks });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/:registration/reserve", async (req, res, next) => {
  try {
    const user = userService.getUserByRegistration(registration);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const book = await reservationService.createReservation(user._id, bookId);
    return res.status(200).json({ message: "reservation successful", book });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:registration/wishlist", (req, res, next) => {});

userRouter.get("/:registration/loans", async (req, res, next) => {
  const registration = req.params.registration;
  try {
    const user = await userService.getUserByRegistration(registration);
    const loans = await loansService.getLoansByUserId(user._id);

    return res.status(200).json({ loans: [loans] });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/:registration/wishlist", (req, res, next) => {});

userRouter.post("/:registration/loans", async (req, res, next) => {
  try {
    const user = await userService.getUserByRegistration(registration);
    if (!user) {
      return res.status(404).json("user with given registration not found");
    }
    if (!bookId) {
      return res.status(400).json("missing required fields or invalid book id");
    }

    return res.status(200).json({
      message: "loan successful",
      userId: registration,
      bookId: bookId,
      dueDate: Date.now,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/:registration/loans/renew", (req, res, next) => {});

userRouter.delete("/:registration/reserved/:bookId", async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const reservations = await reservationService.getReservationByBookId(
      bookId
    );
    if (!reservations) {
      return res.status(404).json("reservation not found");
    }
    const deletedReservation = await reservationService.deleteReservation(
      reservations._id
    );
    return res
      .status(200)
      .json({ message: "deleted reservation successful", deletedReservation });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:registration/wishlist/:bookId", (req, res, next) => {});

userRouter.put("/:registration/loan/return/:loanId", (req, res, next) => {});

module.exports = userRouter;
