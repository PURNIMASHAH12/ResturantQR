const express = require("express");
const User = require("../models/User");

const { protect } = require("../middleware/AuthMiddleware");
const {
  superAdminOnly,
} = require("../middleware/SuperAdminMiddleware");

const router = express.Router();


// =====================================
// GET ADMIN + WAITER ACCOUNTS
// =====================================

router.get(
  "/staff",
  protect,
  superAdminOnly,
  async (req, res) => {
    try {
      const staff = await User.find({
        role: { $in: ["admin", "waiter"] },
      }).select("-password");

      res.json({
        staff,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to load staff accounts.",
      });
    }
  }
);


// =====================================
// ENABLE / DISABLE STAFF ACCOUNT
// =====================================

router.put(
  "/staff/:id/status",
  protect,
  superAdminOnly,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      // Prevent Super Admin from disabling itself
      if (user.role === "superadmin") {
        return res.status(403).json({
          message: "Super Admin account cannot be disabled.",
        });
      }

      user.isActive = !user.isActive;

      await user.save();

      res.json({
        message: user.isActive
          ? "Account activated successfully."
          : "Account disabled successfully.",

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        },
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to update account.",
      });
    }
  }
);
module.exports = router;