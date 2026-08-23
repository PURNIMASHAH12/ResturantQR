const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    // Customer's optional instruction
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    tableNumber: {
      type: String,
      required: true,
      trim: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["counter", "online"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "waiter_requested",
        "confirmed",
        "preparing",
        "ready",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    confirmationMethod: {
      type: String,
      enum: ["customer", "waiter", null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);