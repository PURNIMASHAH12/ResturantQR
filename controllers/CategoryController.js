const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });}};
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });}};
// Update
const updateCategory = async (req, res) => {
  try {
    console.log("UPDATE ID:", req.params.id);
    const category = await Category.findById(req.params.id);
    console.log("CATEGORY FOUND:", category);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });}
    category.name = req.body.name;
    await category.save();
    res.json({
      success: true,
      message: "Category updated successfully",
      category
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });}};
// Delete
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });}
    res.json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });}};
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};