import express from "express";
import productController from "../controllers/productController.js";

const Router = express.Router();
Router.post("/productadd", productController.add);
Router.post("/productfetch", productController.fetch);

export default Router;
