const mongoose = require("mongoose");

const loansSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  loanDate: Date,
  returnDate: Date,
  status: String,
});

const Loan = mongoose.model("Loan", loansSchema);

module.exports = { Loan };
