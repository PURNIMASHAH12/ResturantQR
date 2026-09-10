const User = require("../models/User");

// Get dashboard statistics
const getStats = async (req, res) => {
  try {
    const admins = await User.countDocuments({
      role: "admin",
    });

    const waiters = await User.countDocuments({
      role: "waiter",
    });

    res.json({
      admins,
      waiters,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to load statistics.",
    });
  }
};


// Get all admins and waiters
const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {
        role: { $in: ["admin", "waiter"] },
      },
      "-password"
    ).sort({ createdAt: -1 });

    res.json({
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to load users.",
    });
  }
};


// Delete admin or waiter
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Super Admin cannot delete another Super Admin
    if (user.role === "superadmin") {
      return res.status(403).json({
        message: "Super Admin cannot be deleted.",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User removed successfully.",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to remove user.",
    });
  }
};


module.exports = {
  getStats,
  getUsers,
  deleteUser,
};