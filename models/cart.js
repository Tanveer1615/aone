import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productid: { type: String },
    quantity: { type: String, default: 1 },
    userid: { type: String, },
    title: { type: String, },
    price: { type: String,  },
    category: { type: String,},
    brand: { type: String, },
    image: { type: String, },
  },
  { timestamps: true }
);

// Model
const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
