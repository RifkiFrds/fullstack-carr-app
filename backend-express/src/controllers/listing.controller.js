const listingService = require('../services/listing.service');
const categoryService = require('../services/category.service');
const { validationResult } = require('express-validator');

/**
 * GET /api/listings
 * Supports: ?search=, ?category=, ?sort=newest|oldest, ?page=, ?limit=
 */
const getListings = async (req, res) => {
  try {
    const { search, category, sort, page, limit } = req.query;
    const result = await listingService.getListings({ search, category, sort, page, limit });
    return res.status(200).json({
      success: true,
      message: 'Listings retrieved successfully',
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * GET /api/listings/:id
 */
const getListingById = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await listingService.getListingById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Listing retrieved successfully',
      data: listing
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * POST /api/listings
 */
const createListing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { title, description, imageUrl, metadata, categoryId } = req.body;
  const createdBy = req.user.id; // Automatically assign createdBy from authenticated user

  try {
    // Validate Category existence
    const categoryExists = await categoryService.getCategoryById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const listing = await listingService.createListing({
      title,
      description,
      imageUrl,
      metadata,
      categoryId,
      createdBy
    });

    return res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: listing
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * PUT /api/listings/:id
 */
const updateListing = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { title, description, imageUrl, metadata, categoryId } = req.body;

  try {
    const existing = await listingService.getListingById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Validate Category existence if changing categoryId
    if (categoryId !== undefined && Number(categoryId) !== existing.categoryId) {
      const categoryExists = await categoryService.getCategoryById(categoryId);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
    }

    const updated = await listingService.updateListing(id, {
      title,
      description,
      imageUrl,
      metadata,
      categoryId
    });

    return res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
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
 * DELETE /api/listings/:id
 */
const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await listingService.getListingById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    await listingService.deleteListing(id);
    return res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing
};
