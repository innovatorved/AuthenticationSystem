const User = require("../../models/User");

const checkIsAdmin = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);
  if (!user.isAdmin) {
    res.status(407).json({
      success: false,
      error: "User is Not a Admin User",
    });
    return;
  }
  next();
};

module.exports = checkIsAdmin;
