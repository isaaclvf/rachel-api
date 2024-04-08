const { User } = require("../models/users.model");
const {
  MissingFieldsError,
  NotFoundError,
  ConflictError,
} = require("../utils/error");

//retorna todos os usuários
async function getAllUsers(page = 1, limit = 10) {
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return users;
}

async function 
//busca usuário pelo ID
getUserById(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("user not found");
  }
  return user;
}

//busca usuário pelo registro
async function getUserByRegistration(registration) {
  const user = await User.find({ registration });
  if (!user || user.length === 0) {
    throw new NotFoundError("no user found for this registration");
  }
  return user;
}

//busca usuário pelo registro e pela senha
async function getUserByRegistrationAndPassword(registration, password) {
  const user = await User.find({ registration, password });
  if (!user || user.length === 0) {
    throw new NotFoundError("no user found for this registration");
  }
  return user;
}

//cria novo usuário
async function createUser({registration,type, password}) {
  
  if (!registration || !password || !type) {
    throw new MissingFieldsError("missing required fields");
  }
  const existingUser = await User.findOne({ registration });
  if (existingUser) {
    throw new ConflictError("user already exists");
  }
  const newUser = new User({registration,type,password});
  return await newUser.save();
}

//exclui usuário
async function deleteUserById(id) {
  const userDelete = await User.findByIdAndDelete(id);
  if (!userDelete) {
    throw new NotFoundError("user not found");
  }
  return userDelete;
}

//atualiza dados de um usuário
async function updateUser(id, updates) {
  if (!id || !updates || Object.keys(updates).length === 0) {
    throw new MissingFieldsError("missing required fields");
  }

  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new NotFoundError("user not found");
  }
  
  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
}

module.exports = {
  
  getUserById,
  getAllUsers,
  getUserByRegistration,
  getUserByRegistrationAndPassword,
  createUser,
  deleteUserById,
  updateUser,
};
