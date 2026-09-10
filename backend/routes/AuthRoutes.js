const express = require("express");

const {
  login,
} = require("../controllers/AuthController");

const { protect } = require("../middleware/AuthMiddleware");

const User = require("../models/User");

const router = express.Router();


// LOGIN
router.post("/login", login);


// CHECK CURRENT ACCOUNT
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to check account status.",
    });
  }
});


module.exports = router;