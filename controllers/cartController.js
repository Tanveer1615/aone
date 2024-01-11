import cartModel from "../models/cart.js";

class cartController {
  static enter = async (req, res) => {
    // console.log(req.body);

    const data = await cartModel.find({
      productid: req.body.productid,
      userid: req.body.userid,
    });

    if (data.length) {
      res.send({ status: "Iteam Already Added" });
    } else {
      const data = new cartModel(req.body);
      const hii = await data.save();

      res.status(201).send({ status: "Iteam Added to Cart", item: hii });
    }
  };
  static fetch = async (req, res) => {
    const { authorization } = req.headers;

    const data = await cartModel.find({
      userid: authorization,
    });
    res.send(data);
  };
  static delete = async (req, res) => {
    const data = await cartModel.findByIdAndDelete(req.body);
    res.send(data);
  };
  static update = async (req, res) => {
    const data = await cartModel
      .findByIdAndUpdate(
        req.body._id,
        {
          quantity: req.body.quantity,
        },
        { new: true }
      )
      .exec();
    res.send(data);
  };
}
export default cartController;
