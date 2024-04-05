const { Router } = require("express");
const booksService = require("../services/books.service");
const booksRouter = Router();

booksRouter.post("/", async (req, res, next) => {
  try {
    const { title, author, edition, isbn, status } = req.body;
    const newBook = await booksService.createBook({
      title,
      author,
      edition,
      isbn,
      status,
    });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/", async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const books = await booksService.getAllBooks(page, limit);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const book = await booksService.getBookById(id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

booksRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;

  const allowedFields = ["title", "author", "edition", "isbn", "status"];

  const filteredUpdates = Object.keys(updates)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = updates[key];
      return obj;
    }, {});

  try {
    const updatedBook = await booksService.updateBook(id, filteredUpdates);
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
});

booksRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await booksService.deleteBook({ id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/isbn/:isbn", async (req, res, next) => {
  const isbn = req.params.isbn;
  try {
    const book = await booksService.getBookByISBN(isbn);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/author/:author", async (req, res, next) => {
  const author = req.params.author;
  try {
    const books = await booksService.getBooksByAuthor(author);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/status/:status", async (req, res, next) => {
  const status = req.params.status;
  try {
    const books = await booksService.getBooksByStatus(status);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/title/:title", async (req, res, next) => {
  const title = req.params.title;
  try {
    const books = await booksService.getBooksByTitle(title);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/search/:query", async (req, res, next) => {
  const query = req.params.query;
  try {
    const books = await booksService.searchBooks(query);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

module.exports = booksRouter;
