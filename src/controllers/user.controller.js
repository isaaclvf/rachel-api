const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req, res, next) => {});

userRouter.post("/", (req, res, next) => {});

userRouter.get("/:registration", (req, res, next) => {});

userRouter.put("/:registration", (req, res, next) => {});

userRouter.get("/:registration/books", (req, res, next) => {});

userRouter.get("/:registration/reserved", (req, res, next) => {});

userRouter.post("/:registration/reserve", (req, res, next) => {});

userRouter.get("/:registration/wishlist", (req, res, next) => {});

userRouter.get("/:registration/loans", (req, res, next) => {});

userRouter.post("/:registration/wishlist", (req, res, next) => {});

userRouter.post("/:registration/loans", (req, res, next) => {});

userRouter.post("/:registration/loans/renew", (req, res, next) => {});

userRouter.delete("/:registration/reserved/:bookId", (req, res, next) => {});

userRouter.delete("/:registration/wishlist/:bookId", (req, res, next) => {});

userRouter.put("/:registration/loan/return/:loanId", (req, res, next) => {});

module.exports = userRouter;
