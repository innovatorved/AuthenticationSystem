const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "we are secure",
  });
});

module.exports = router;
