const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  confirmOrder,
  updateOrder,
  updateOrderStatus,
} = require("../controllers/OrderController");
const router = express.Router();
router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.put(
  "/:id/confirm",
  confirmOrder
);
router.put(
  "/:id/status",
  updateOrderStatus
);
module.exports = router;