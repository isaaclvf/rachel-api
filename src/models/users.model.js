const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  registration: String,
  fullName: String,
  email: String,
  type: String,
  password: String,
});

const User = mongoose.model("User", usersSchema);

module.exports = { User };
