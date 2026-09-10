const express = require("express");

const {
  createOrder,
  getOrders,
  getOrderById,
  confirmOrder,
  updateOrder,
  updateOrderStatus,
  printConfirmedOrder,
} = require("../controllers/OrderController");

const { protect } = require("../middleware/AuthMiddleware");
const { adminOrWaiter } = require("../middleware/RoleMiddleware");

const router = express.Router();

router.post(
  "/",
  createOrder
);

router.get(
  "/:id/customer",
  getOrderById
);

router.get(
  "/",
  protect,
  adminOrWaiter,
  getOrders
);

router.get(
  "/:id",
  protect,
  adminOrWaiter,
  getOrderById
);

router.put(
  "/:id",
  protect,
  adminOrWaiter,
  updateOrder
);

router.put(
  "/:id/customer_confirm",
  confirmOrder
);

router.put(
  "/:id/confirm",
  protect,
  adminOrWaiter,
  confirmOrder
);
router.post(
  "/:id/print",
  protect,
  adminOrWaiter,
  printConfirmedOrder
);
router.put(
  "/:id/status",
  protect,
  adminOrWaiter,
  updateOrderStatus
);
module.exports = router;