const mongoose = require("mongoose");
const Order = require("../models/Order");
const Food = require("../models/Food");
const { getIO } = require("../socket");

const getOrder = (id) =>
  Order.findById(id).populate("items.food", "name price");

const prepareItems = async (items) => {
  if (!Array.isArray(items) || !items.length)
    throw new Error("Order must contain at least one item.");

  const result = [];

  for (const item of items) {
    if (!item.food || !mongoose.Types.ObjectId.isValid(item.food))
      throw new Error("Invalid food item in order.");

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity < 1)
      throw new Error("Item quantity must be at least 1.");

    const food = await Food.findById(item.food);
    if (!food) throw new Error(`Food item not found: ${item.food}`);
    if (!food.available) throw new Error(`${food.name} is currently unavailable.`);

    result.push({
      food: food._id,
      name: food.name,
      price: Number(food.price),
      quantity,
      remarks: item.remarks?.trim() || "",
    });
  }

  return result;
};

const total = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const createOrder = async (req, res) => {
  try {
    const { customerName, tableNumber, items, paymentMethod, confirmationMethod } = req.body;

    if (!customerName?.trim())
      return res.status(400).json({ success: false, message: "Customer name is required." });

    if (tableNumber === undefined || tableNumber === null || !String(tableNumber).trim())
      return res.status(400).json({ success: false, message: "Table number is required." });

    if (!["counter", "online"].includes(paymentMethod))
      return res.status(400).json({ success: false, message: "Invalid payment method." });

    if (!["customer", "waiter"].includes(confirmationMethod))
      return res.status(400).json({ success: false, message: "Invalid confirmation method." });

    let prepared;
    try {
      prepared = await prepareItems(items);
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const order = await Order.create({
      customerName: customerName.trim(),
      tableNumber: String(tableNumber).trim(),
      items: prepared,
      totalAmount: total(prepared),
      paymentMethod,
      status: confirmationMethod === "waiter" ? "waiter_requested" : "pending",
      confirmationMethod: null,
    });

    const result = await getOrder(order._id);
    getIO().emit("new-order", result);

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.food", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid order ID." });

    const order = await getOrder(id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found." });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found." });

    if (order.status !== "waiter_requested")
      return res.status(400).json({
        success: false,
        message: "Only waiter-requested orders can be edited.",
      });

    let items;
    try {
      items = await prepareItems(req.body.items);
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    order.items = items;
    order.totalAmount = total(items);
    await order.save();

    const result = await getOrder(id);
    getIO().emit("order-updated", result);

    res.json({
      success: true,
      message: "Order updated successfully.",
      order: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { confirmationMethod } = req.body;
    const order = await Order.findById(id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found." });

    const valid =
      (confirmationMethod === "customer" && order.status === "pending") ||
      (confirmationMethod === "waiter" && order.status === "waiter_requested");

    if (!valid)
      return res.status(400).json({
        success: false,
        message: "Order cannot be confirmed in its current status.",
      });

    order.status = "confirmed";
    order.confirmationMethod = confirmationMethod;
    await order.save();

    const result = await getOrder(id);
    const io = getIO();

    io.emit("order-updated", result);
    io.emit("order-confirmed", result);
    io.emit("order-confirmed-kitchen", result);

    res.json({
      success: true,
      message: "Order confirmed successfully.",
      order: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = [
      "pending",
      "waiter_requested",
      "confirmed",
      "preparing",
      "ready",
      "completed",
      "cancelled",
    ];

    if (!allowed.includes(status))
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });

    const order = await Order.findById(id);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });

    order.status = status;
    await order.save();

    const result = await getOrder(id);
    const io = getIO();

    io.emit("order-updated", result);

    if (status === "preparing") io.emit("order-preparing", result);
    if (status === "ready") io.emit("order-ready", result);
    if (status === "completed") io.emit("order-completed", result);
    if (status === "cancelled") io.emit("order-cancelled", result);

    res.json({
      success: true,
      message: "Order status updated successfully.",
      order: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  confirmOrder,
  updateOrderStatus,
};