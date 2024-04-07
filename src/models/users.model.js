const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  registration: String,
  fullName: String,
  profilePictureUrl: String,
  birthdate: Date,
  email: String,
  phone: String,
  type: String,
  password: String,
  gender: String,
  cpf: String,
  address: String,
});

const User = mongoose.model("User", usersSchema);

module.exports = { User };
