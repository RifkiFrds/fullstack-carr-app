const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../controllers/category.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Validation middleware
const validateCategory = [
  body('name')
    .notEmpty().withMessage('Category name is required')
    .isString().withMessage('Category name must be a string'),
  body('slug')
    .notEmpty().withMessage('Category slug is required')
    .isString().withMessage('Category slug must be a string')
    .matches(/^[a-z0-9-]+$/).withMessage('Category slug must be URL-friendly (lowercase letters, numbers, and dashes only)')
];

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

// Protected routes
router.post('/', verifyToken, validateCategory, categoryController.createCategory);
router.put('/:id', verifyToken, validateCategory, categoryController.updateCategory);
router.delete('/:id', verifyToken, categoryController.deleteCategory);

module.exports = router;
