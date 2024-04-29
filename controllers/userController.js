import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookiepart from "cookie-parser";
import cartModel from "../models/cart.js";
// import transporter from '../config/emailConfig.js'

class UserController {
  static userRegistration = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new UserModel({
          email: email,
          password: hashPassword,
        });
        await doc.save();
        const saved_user = await UserModel.findOne({ email: email });
        // Generate JWT Token
        const token = jwt.sign(
          { userID: saved_user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );

        res.cookie("auth", token, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
        });

        // res.cookie("$1234$", token);
        res.status(201).send({
          status: "success",
          userData: saved_user,
        });
      } catch (error) {
        res.send({ status: "failed", message: "Unable to Register" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email: email });

      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (user.email === email && isMatch) {
          // Generate JWT Token
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.cookie("auth", token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
          });
          const id = user._id.toString();

          const totalcartitem = await cartModel.find({ userid: id });

          res.status(200).send({
            status: "success",
            userData: user,
            total: totalcartitem,
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or Password is not Valid",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "Email or Password is not Valid",
        });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

  static loggedUser = async (req, res) => {
    const totalcartitem = await cartModel.find({ userid: req.user._id });

    res.json({ ...req.user, carItem: totalcartitem });
  };

  static addAddress = async (req, res) => {
    const data = await UserModel.findByIdAndUpdate(
      req.body._id,
      req.body,

      { new: true }
    ).exec();
    res.send(data);
  };
  static logout = async (req, res) => {
    res.clearCookie("auth");

    res.send({ status: "success" });
  };
}

export default UserController;
