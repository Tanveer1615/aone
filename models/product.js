import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Model
const productModel = mongoose.model("product", productSchema);

export default productModel;
