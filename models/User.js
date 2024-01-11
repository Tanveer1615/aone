import mongoose from "mongoose";

// Defining Schema

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    addresses: [],
    // for addresses, we can make a separate Schema like orders. but in this case we are fine
    name: { type: String },

    resetPasswordToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// Model
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
