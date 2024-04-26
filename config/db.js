const mongoose = require("mongoose");

async function connectDB() {
  try {
    const DB_OPTIONS = {
      dbName: "Tanveer",
    };
    await mongoose.connect(process.env.MONGODB_URI, DB_OPTIONS);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
