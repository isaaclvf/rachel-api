const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  edition: String,
  isbn: String,
  status: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
