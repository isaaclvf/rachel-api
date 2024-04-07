const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;

async function connect() {
  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error.message);
  }
}

module.exports = { connect, disconnect };
