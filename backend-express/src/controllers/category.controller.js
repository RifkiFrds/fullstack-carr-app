const categoryService = require('../services/category.service');
const { validationResult } = require('express-validator');

/**
 * GET /api/categories
 */
const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * GET /api/categories/:id
 */
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * POST /api/categories
 */
const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { name, slug, description } = req.body;

  try {
    // Check slug uniqueness
    const existing = await categoryService.getCategoryBySlug(slug);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Category slug already exists'
      });
    }

    const category = await categoryService.createCategory({ name, slug, description });
    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * PUT /api/categories/:id
 */
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { name, slug, description } = req.body;

  try {
    const existing = await categoryService.getCategoryById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check slug uniqueness (if changing)
    if (slug !== existing.slug) {
      const duplicate = await categoryService.getCategoryBySlug(slug);
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: 'Category slug already exists'
        });
      }
    }

    const updated = await categoryService.updateCategory(id, { name, slug, description });
    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * DELETE /api/categories/:id
 */
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await categoryService.getCategoryById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    await categoryService.deleteCategory(id);
    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
