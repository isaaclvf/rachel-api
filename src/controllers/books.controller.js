const { Router } = require("express");

const booksService = require("../services/books.service");

const booksRouter = Router();

booksRouter.get("/", (req, res) => {
  const books = booksService.getAllBooks();
  res.send(books);
});

module.exports = booksRouter;
