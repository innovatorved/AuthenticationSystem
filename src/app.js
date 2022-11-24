require("dotenv").config();
require("../database/database.js").connect();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth/auth")); // Route auth.js
app.use(
  "/web",
  require("./middleware/auth"),
  require("./routes/secure/routes")
); // Secure routes

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server responding successfully",
  });
});

module.exports = app;
