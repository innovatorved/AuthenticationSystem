const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../../../models/User");

const jwt = require("jsonwebtoken");
const user = require("../../../models/User");
const { JWT_TOKEN } = process.env;

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      res.status(400).json({
        success: false,
        error: "Compulsory fields are not filled",
      });
      return;
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(401).json({
        success: false,
        error: "User Already exist no need to Register Again",
      });
      return;
    }

    const HashPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: HashPassword,
    });

    const token = jwt.sign(
      {
        id: newUser["_id"],
        name: newUser["firstName"],
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
        user: newUser,
        token: token,
        error: "",
      });
  } catch (error) {
    res.status(402).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({
        success: false,
        error: "Compulsory fields are not filled",
      });
      return;
    }

    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      res.status(401).json({
        success: false,
        error: "User Not Exist",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordCorrect) {
      res.status(402).json({
        success: false,
        error: "Password is not Correct",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: isUserExist["_id"],
        name: isUserExist["firstName"],
      },
      JWT_TOKEN,
      {
        expiresIn: "24h",
      }
    );

    isUserExist.token = token;
    isUserExist.password = undefined;

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user: isUserExist,
        token: token,
        error: "",
      });
  } catch (error) {
    res.status(402).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
