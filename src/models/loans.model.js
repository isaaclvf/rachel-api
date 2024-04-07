const mongoose = require("mongoose");

const loansSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  loanDate: { type: Date, default: Date.now },
  dueDate: Date,
  status: String,
});

const Loan = mongoose.model("Loan", loansSchema);

module.exports = { Loan };
