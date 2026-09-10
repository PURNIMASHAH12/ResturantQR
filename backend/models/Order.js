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
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  });
const orderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ["dine_in", "parcel"],
      default: "dine_in",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
      default: "",
    },
    deliveryAddress: {
      type: String,
      trim: true,
      default: "",
    },
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    tableNumber: {
      type: String,
      trim: true,
      default: "",
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
orderSchema.index({ status: 1, createdAt: -1 });
module.exports = mongoose.model("Order", orderSchema);