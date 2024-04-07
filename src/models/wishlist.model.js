const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = { Wishlist };
