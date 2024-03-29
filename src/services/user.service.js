const { User } = require("../models/users.model");

async function getAllUsers(page, limit) {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}

async function createUser({ id, registration, completeName, email, type, password }) {
    const newUser = new User({ id, registration, completeName, email, type, password });
    return await newUser.save();
}

async function deleteUserById(id){
    return await User.findByIdAndDelete(id);
}

async function updateUser(id, {id, registration, completeName, email, password }){
    return await User.findOneAndUpdate(id, {id, registration, completeName, email, password });
}

module.exports = {
    getById,
    getAllUsers,
    createUser,
    deleteUserById,
    updateUser
};



