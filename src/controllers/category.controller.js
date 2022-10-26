const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  try {
    const categoryName = req.body.name;
    const newCategory = await categoryService.createCategory(categoryName);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createCategory, getAllCategories };