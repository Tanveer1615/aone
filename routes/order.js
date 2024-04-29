import express from "express";
import orderController from "../controllers/orderController.js";

const Router = express.Router();
Router.post("/order", orderController.add);
Router.post("/orderfetch", orderController.fetch);

export default Router;
