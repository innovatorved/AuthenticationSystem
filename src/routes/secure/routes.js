const express = require("express");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = process.env;

const User = require("../../../models/User");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "we are secure",
  });
});

router.post("/updateuser", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const id = req.user.id;

    const newUser = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
    });

    const token = jwt.sign(
      {
        id: newUser["_id"],
        name: firstName,
      },
      JWT_TOKEN,
      {
        expiresIn: "24h",
      }
    );

    newUser.token = token;
    newUser.password = undefined;

    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user: { ...newUser, firstName, lastName, email },
        token: token,
        error: "",
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/getuserinfo", async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).select(["-password", "-date"]);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
