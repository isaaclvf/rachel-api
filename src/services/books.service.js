const { Book } = require("../models/book.model");

async function getAllBooks(page, limit) {
  return await Book.find();
}

async function createBook({ title, author, edition, ispn, status }) {
  const newBook = new Book({ title, author, edition, ispn, status });
  return await newBook.save();
}

module.exports = {
  getAllBooks,
  createBook,
};
