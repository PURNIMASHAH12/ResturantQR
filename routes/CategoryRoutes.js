const express = require("express");

const {
  createCategory,
  getCategories,
   updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", createCategory);
router.put("/:id", updateCategory);

router.get("/", getCategories);

router.delete("/:id", deleteCategory);

module.exports = router;