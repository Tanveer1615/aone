const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "dist")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
