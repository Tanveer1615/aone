import mongoose from "mongoose";

const connection = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "Tanveer",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected Successfully...");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
