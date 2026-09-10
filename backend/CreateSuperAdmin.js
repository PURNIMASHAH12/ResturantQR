const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createSuperAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({
      email: "superadmin@restaurantqr.com",
    });

    if (existing) {
      console.log("Super Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "SuperAdmin123!",
      10
    );

    await User.create({
      name: "Super Admin",
      email: "superadmin@restaurantqr.com",
      password: hashedPassword,
      role: "superadmin",
      isActive: true,
    });

    console.log("Super Admin created successfully.");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
};

createSuperAdmin();