require("dotenv").config();
require("../database/database.js").connect();

const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const windowTime = 1;
const maxRequestInTime = 25;

const app = express();
const rateLimiter = rateLimit({
  windowMs: windowTime * 60 * 1000,
  max: maxRequestInTime,
});

app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/auth/auth")); // Route auth.js
app.use(
  "/web",
  require("./middleware/auth"),
  require("./routes/secure/routes")
); // Secure routes
app.use(
  "/admin",
  require("./middleware/auth"),
  require("./middleware/checkadmin"),
  require("./routes/admin/routes")
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server responding successfully",
  });
});

module.exports = app;
