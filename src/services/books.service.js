const books = require("../data/books");

function getAllBooks(page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return books.slice(startIndex, endIndex);
}

module.exports = {
  getAllBooks,
};
