const { Router } = require("express");
const booksService = require("../services/books.service");
const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = await booksService.createBook({ title, author });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = booksRouter;
