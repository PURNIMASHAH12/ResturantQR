const express = require("express");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/AuthMiddleware");
const { adminOnly } = require("../middleware/AdminMiddleware");

const router = express.Router();


// ADMIN ONLY
router.post(
  "/",
  protect,
  adminOnly,
  createCategory
);


// PUBLIC
router.get(
  "/",
  getCategories
);


// ADMIN ONLY
router.put(
  "/:id",
  protect,
  adminOnly,
  updateCategory
);


// ADMIN ONLY
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteCategory
);

module.exports = router;