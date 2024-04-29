import express from "express";
import cartController from "../controllers/cartController.js";

const Router = express.Router();
Router.post("/cart", cartController.enter);
Router.get("/cart", cartController.fetch);
Router.post("/delete", cartController.delete);
Router.post("/update", cartController.update);

export default Router;
