import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

var checkUserAuth = async (req, res, next) => {
  // console.log("hello")
  let token;
  const { authorization } = req.headers;
  // console.log("********" + authorization + "******");
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token from header
      token = authorization.split(" ")[1];

      if (!token) {
        res
          .status(200)
          .send({ status: "failed", message: "Unauthorized User, No Token" });
      }

      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log("userId" + userID);

      // Get User from Token

      req.user = await UserModel.findById(userID);
      // console.log("req"+ req.user);

      next();
    } catch (error) {
      // console.log(error)
      res.status(200).send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;
