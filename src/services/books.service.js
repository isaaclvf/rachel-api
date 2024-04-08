const { Book } = require("../models/book.model");
const {
  MissingFieldsError,
  NotFoundError,
  ConflictError,
} = require("../utils/error");

// retorna todos os livros
async function getAllBooks(page = 1, limit = 10) {
  const books = await Book.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return books;
}

// busca livro pelo ID
async function getBookById(id) {
  const book = await Book.findById(id);
  if (!book) {
    throw new NotFoundError("book not found");
  }
  return book;
}

// busca livro pelo ISBN
async function getBookByISBN(isbn) {
  const book = await Book.find({ isbn });
  if (!book || book.length === 0) {
    throw new NotFoundError("book not found");
  }
  return book;
}

// busca livro pelo autor
async function getBooksByAuthor(author) {
  const books = await Book.find({ author });
  if (!books || books.length === 0) {
    throw new NotFoundError("no books found for this author");
  }
  return books;
}

// busca livro pelo título
async function getBooksByTitle(title) {
  const books = await Book.find({ title });
  if (!books || books.length === 0) {
    throw new NotFoundError("no books found for this title");
  }
  return books;
}

// busca livro pelo status
async function getBooksByStatus(status) {
  const books = await Book.find({ status });
  if (!books || books.length === 0) {
    throw new NotFoundError("no books found for this status");
  }
  return books;
}

// função de busca
async function searchBooks(query) {
  const books = await Book.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
      { isbn: { $regex: query, $options: "i" } },
    ],
  });
  return books;
}

// função para criar livro
async function createBook({ title, author, edition, isbn, status }) {
  if (!title || !author || !edition || !isbn || !status) {
    throw new MissingFieldsError("missing required fields");
  }

  const existingBook = await Book.findOne({ isbn });
  if (existingBook) {
    throw new ConflictError("book already exists");
  }

  const newBook = new Book({ title, author, edition, isbn, status });
  const savedBook = await newBook.save();
  return savedBook;
}

// atualizar dados de um livro
async function updateBook(id, updates) {
  if (!id || !updates || Object.keys(updates).length === 0) {
    throw new MissingFieldsError("missing required fields");
  }

  const existingBook = await Book.findById(id);
  if (!existingBook) {
    throw new NotFoundError("book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return updatedBook;
}

// deletar um livro
async function deleteBook({ id }) {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new NotFoundError("book not found");
  }
  return deletedBook;
}

// exportar funções
module.exports = {
  getAllBooks,
  getBookById,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByStatus,
  getBooksByTitle,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
};
