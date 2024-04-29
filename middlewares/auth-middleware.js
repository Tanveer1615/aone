import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

var checkUserAuth = async (req, res, next) => {
  if (req.cookies.auth) {
    const token = req.cookies.auth;
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(200)
          .send({ status: "failed", message: "Unauthorized User" });
      } else {
        const dat = await UserModel.findById(decoded.userID);
        req.user = dat;
        next();
      }
    });
  } else {
    res
      .status(200)
      .send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;
