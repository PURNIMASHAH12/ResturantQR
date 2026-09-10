const express = require("express");

const {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/FoodController");

const router = express.Router();

const { protect } = require("../middleware/AuthMiddleware");
const { adminOnly } = require("../middleware/AdminMiddleware");

router.post(
  "/",
  protect,
  adminOnly,
  createFood
);

router.get(
  "/",
  getFoods
);

router.get(
  "/:id",
  getFoodById
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateFood
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteFood
);
module.exports = router;