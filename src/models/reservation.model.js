const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = { Reservation };
