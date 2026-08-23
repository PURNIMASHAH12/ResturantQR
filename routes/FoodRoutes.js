const express = require("express");

const {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/FoodController");

const router = express.Router();

// Create food
router.post("/", createFood);

// Get all foods
router.get("/", getFoods);

// Get one food
router.get("/:id", getFoodById);

// Update food
router.put("/:id", updateFood);

// Delete food
router.delete("/:id", deleteFood);

module.exports = router;