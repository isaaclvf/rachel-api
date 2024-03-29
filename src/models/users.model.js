const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    id: String,
    registration: String,
    completeName: String,
    email: String,
    password: String
});

const User = mongoose.model("User", usersSchema);

module.exports = { User };