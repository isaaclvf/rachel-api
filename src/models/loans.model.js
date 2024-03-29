const mongoose = require("mongoose");

const loansSchema = new mongoose.Schema({
  id: String,
  idUser: String,
  idBook:String,
  loanDate: Date,
  returnDate: Date,
  status: String
});

const Loan = mongoose.model("Loan", loansSchema);

module.exports = { Loan };