require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const createWaiter = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingWaiter = await User.findOne({
      email: "waiter@restaurant.com",
    });

    if (existingWaiter) {
      console.log("Waiter account already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Waiter123",
      10
    );

    const waiter = await User.create({
      name: "Waiter",
      email: "waiter@restaurant.com",
      password: hashedPassword,
      role: "waiter",
    });

    console.log("Waiter created successfully!");
    console.log("Email: waiter@restaurant.com");
    console.log("Password: Waiter123");
    console.log("Role:", waiter.role);

    process.exit();
  } catch (error) {
    console.error("Error creating waiter:", error);
    process.exit(1);
  }
};

createWaiter();