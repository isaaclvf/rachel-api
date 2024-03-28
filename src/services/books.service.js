const books = require("../data/books");
const { Book } = require("../models/book.model");

async function getAllBooks(page, limit) {
  return await Book.find();
}

async function createBook({ title, author }) {
  const newBook = new Book({ title, author });
  return await newBook.save();
}

module.exports = {
  getAllBooks,
  createBook,
};
