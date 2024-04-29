import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

// ROute Level Middleware - To Protect Route
router.use("/loggeduser", checkUserAuth);

// Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.get("/logout", UserController.logout);

router.post("/address", UserController.addAddress);

// Protected Routes
router.get("/loggeduser", UserController.loggedUser);
// router.post('/changepassword', UserController.changeUserPassword)

export default router;
