const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  edition: String,
  isbn: String,
  status: String,
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
