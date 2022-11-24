const jwt = require("jsonwebtoken");

const { JWT_TOKEN } = process.env;

const auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(407).json({
      success: false,
      error: "Token not found",
      logout: true,
    });
    return;
  }

  try {
    const data = jwt.verify(token, JWT_TOKEN);
    req.user = data;
    next();
  } catch (error) {
    res.status(408).json({
      success: false,
      logout: true,
      error: error.message,
    });
  }
};

module.exports = auth;
