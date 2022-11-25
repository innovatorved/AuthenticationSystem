const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are a Admin User",
  });
});

module.exports = router;
