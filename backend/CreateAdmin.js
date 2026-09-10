require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@restaurant.com",
    });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      "Admin123",
      10
    );

    // Create admin
    const admin = await User.create({
      name: "Admin",
      email: "admin@restaurant.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email: admin@restaurant.com");
    console.log("Password: Admin123");
    console.log("Role:", admin.role);

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();