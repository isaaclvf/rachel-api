const { Router } = require("express");
const booksService = require("../services/books.service");
const booksRouter = Router();

booksRouter.get("/", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const paginatedBooks = booksService.getAllBooks(+page, +limit);
  res.send(paginatedBooks);
});

module.exports = booksRouter;
