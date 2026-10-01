const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is not set. Add it to backend/.env locally or to the Render service's environment variables."
    );
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected successfully");
};

module.exports = connectDB;