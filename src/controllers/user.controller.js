const { Router } = require("express");
const userService = require("../services/user.service");
const loansService = require("../services/loans.service");
const booksService = require("../services/books.service");
const userRouter = Router();

userRouter.get("/", (req, res, next) => { });

userRouter.post("/", (req, res, next) => { });

userRouter.get("/:registration", async (req, res, next) => {
    try {
        const registration = req.params.registration;
        const user = await userService.getUserByRegistration(registration);

        const loan = await loansService.getLoanByUserId(user.id);
        return res.status(200).json({
            fullName: user.fullName,
            profilePictureUrl: user.profilePictureUrl,
            //"debt": 10.50,
            loanedBooks: [loan]
        });
    } catch (error) {
        next(error);
    }
});

userRouter.put("/:registration", async (req, res, next) => {
    const update = req.body;
    const registration = req.params.registration;
    try {
        if (!update.phone || !update.cpf || !update.email || !update.gender || !update.birthdate || !update.address) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = await userService.getUserByRegistration(registration);
        const allowedFields = ["fullName","profilePictureUrl","birthdate","email","phone","gender","cpf","address"];
        const filteredUpdates = Object.keys(update)
            .filter((key) => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = update[key];
                return obj;
            }, {});

        const updated = await userService.updateUser(user.id, filteredUpdates);
        res.status(200).json({
            message: "user information updated successfully",
            user: {
              fullName: updated.fullName,
              profilePictureUrl:updated.profilePictureUrl,
              birthdate:updated.birthdate,
              email: updated.email,
              phone:updated.phone,
              gender:updated.gender,
              cpf:updated.cpf,
              address: updated.address,
            }
          });
    } catch (error) {
        next(error);
    }
});

userRouter.get("/:registration/books", async (req, res, next) => {
    

});

userRouter.get("/:registration/reserved", (req, res, next) => { });

userRouter.post("/:registration/reserve", (req, res, next) => { });

userRouter.get("/:registration/wishlist", (req, res, next) => { });

userRouter.get("/:registration/loans", async (req, res, next) => { 
    const registration = req.params.registration;
    try {
        const user = await userService.getUserByRegistration(registration);
        const loans = await loansService.getLoanByUserId(user.id);

        return res.status(200).json({loans: [loans]});
    } catch (error) {
        next(error);
    }
});

userRouter.post("/:registration/wishlist", (req, res, next) => { });

userRouter.post("/:registration/loans", (req, res, next) => {
    const bookId = req.body;
    const registration = req.params.registration;
    try {
        if (!registration) {
            return res.status(404).json("User with given registration not found");
        }
        if (!bookId) {
            return res.status(400).json("Missing required fields or invalid book id");
        }
        
        return res.status(200).json({message:"loan successful", userId: registration, bookId: bookId, dueDate: Date.now,});
    } catch (error) {
        
    }
});

userRouter.post("/:registration/loans/renew", (req, res, next) => { });

userRouter.delete("/:registration/reserved/:bookId", (req, res, next) => { });

userRouter.delete("/:registration/wishlist/:bookId", (req, res, next) => { });

userRouter.put("/:registration/loan/return/:loanId", (req, res, next) => { });

module.exports = userRouter;
