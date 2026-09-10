const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Please login.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find current user in database
    const user = await User.findById(decoded.id);
    console.log("AUTH CHECK:", {
      id: user?._id,
      email: user?.email,
      role: user?.role,
      isActive: user?.isActive,
    });

    if (!user) {
      return res.status(401).json({
        message: "User account not found.",
      });
    }

    // Check whether account is disabled
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account has been disabled by Super Admin.",
      });
    }

    // Store current user
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = {
  protect,
};