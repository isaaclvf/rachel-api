const mongoose = require("mongoose");

const connectionString = process.env.CONNECTION_STRING;

async function connect() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

module.exports = { connect };
