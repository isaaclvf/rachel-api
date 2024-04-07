const { User } = require("../models/users.model");

async function getAllUsers(page = 1, limit = 10) {
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return users;
}

async function getById(id) {
  return await User.findById(id);
}

async function createUser({
  id,
  registration,
  fullName,
  email,
  type,
  password,
}) {
  const newUser = new User({
    id,
    registration,
    fullName,
    email,
    type,
    password,
  });
  return await newUser.save();
}

async function deleteUserById(id) {
  return await User.findByIdAndDelete(id);
}

async function updateUser(id, { id, registration, fullName, email, password }) {
  return await User.findOneAndUpdate(id, {
    id,
    registration,
    fullName,
    email,
    password,
  });
}

module.exports = {
  getById,
  getAllUsers,
  createUser,
  deleteUserById,
  updateUser,
};
