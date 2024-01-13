import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connection from "./config/connection.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/producRoutes.js";
import orderRoutes from "./routes/order.js";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

connection(process.env.DATABASE_URL);
// CORS Policy
// app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Database Connection
app.use(express.static(path.join(process.cwd(), "build")));

// JSON
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(process.cwd(), "build", "index.html"));
// });

// Load Routes
app.use("/", userRoutes);
app.use("/", cartRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
