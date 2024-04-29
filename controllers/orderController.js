import { json } from "express";
import orderModel from "../models/orders.js";
import cartModel from "../models/cart.js";
class orderController {
  static add = async (req, res) => {
    const d = new orderModel(req.body);
    const data = await d.save();

    const totalcartitem = await cartModel.deleteMany({
      userid: req.body.userId,
    });
    res.send(data);
  };
  static fetch = async (req, res) => {
    const data = await orderModel.find(req.body);

    res.send(data);
  };
}
export default orderController;
