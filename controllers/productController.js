import productModel from "../models/product.js";

class productController {
  static add = async (req, res) => {
    res.send("hiiii");
  };
  static fetch = async (req, res) => {
    if (req.body.count) {
      const to = await productModel
        .find({ category: req.body.ct })
        .countDocuments();
      const data = await productModel
        .find({
          category: req.body.ct,
        })
        .skip(req.body.sk)
        .limit(15);

    
  

      res.send({ data, count: to });
    } else if (req.body.sor) {
     
      const data = await productModel
        .find({
          category: req.body.ct,
        })
        .sort({ price: req.body.sor });

     
      res.send({ data });
    } else {
      const data = await productModel
        .find({
          category: req.body.ct,
        })
        .skip(req.body.sk)
        .limit(15);

      res.send({ data });
    }
  };
}
export default productController;
