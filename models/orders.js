import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true},
    productArray: [],

    totalamout: { type: String },
    totaliteam: { type: String },
  },
  { timestamps: true }
);

// Model
const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
