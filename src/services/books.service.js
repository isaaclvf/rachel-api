const books = require("../data/books");

function getAllBooks() {
  return books;
}

module.exports = {
  getAllBooks,
};
