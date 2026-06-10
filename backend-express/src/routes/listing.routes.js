const express = require('express');
const { body } = require('express-validator');
const listingController = require('../controllers/listing.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Validation middleware
const validateListing = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string'),
  body('categoryId')
    .notEmpty().withMessage('categoryId is required')
    .isInt().withMessage('categoryId must be an integer'),
  body('metadata')
    .optional()
    .isObject().withMessage('Metadata must be a JSON object'),
  body('imageUrl')
    .optional()
    .isString().withMessage('imageUrl must be a string')
];

// Public routes
router.get('/', listingController.getListings);
router.get('/:id', listingController.getListingById);

// Protected routes
router.post('/', verifyToken, validateListing, listingController.createListing);
router.put('/:id', verifyToken, validateListing, listingController.updateListing);
router.delete('/:id', verifyToken, listingController.deleteListing);

module.exports = router;
