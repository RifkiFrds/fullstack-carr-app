const prisma = require('../../prisma/client');

/**
 * Retrieve listings with search, filter, sort, and pagination.
 * @param {object} query
 * @param {string} [query.search] - Search term for title and description
 * @param {string} [query.category] - Category slug to filter by
 * @param {string} [query.sort] - Sort order: 'newest' (default) or 'oldest'
 * @param {number} [query.page] - Page number (default 1)
 * @param {number} [query.limit] - Items per page (default 10)
 * @returns {Promise<object>} { data, pagination }
 */
const getListings = async (query = {}) => {
  const { search, category, sort, page = 1, limit = 10 } = query;

  // Build WHERE clause
  const where = {};

  // Search: match title OR description (case-insensitive)
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  // Category filter: match by category slug
  if (category) {
    where.category = { slug: category };
  }

  // Build ORDER BY clause
  const orderBy = {
    createdAt: sort === 'oldest' ? 'asc' : 'desc'
  };

  // Pagination
  const currentPage = Math.max(1, Number(page));
  const perPage = Math.min(100, Math.max(1, Number(limit)));
  const skip = (currentPage - 1) * perPage;

  // Execute count + findMany in parallel
  const [total, data] = await Promise.all([
    prisma.listing.count({ where }),
    prisma.listing.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy,
      skip,
      take: perPage
    })
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data,
    pagination: {
      total,
      page: currentPage,
      limit: perPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  };
};

/**
 * Retrieve a specific listing by ID.
 * @param {number} id 
 * @returns {Promise<object|null>}
 */
const getListingById = async (id) => {
  return await prisma.listing.findUnique({
    where: { id: Number(id) },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      user: {
        select: {
          id: true,
          username: true,
          email: true
        }
      }
    }
  });
};

/**
 * Create a new listing.
 * @param {object} data 
 * @returns {Promise<object>}
 */
const createListing = async (data) => {
  const { title, description, imageUrl, metadata, categoryId, createdBy } = data;
  return await prisma.listing.create({
    data: {
      title,
      description,
      imageUrl,
      metadata: metadata || {},
      categoryId: Number(categoryId),
      createdBy: Number(createdBy)
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  });
};

/**
 * Update an existing listing.
 * @param {number} id 
 * @param {object} data 
 * @returns {Promise<object>}
 */
const updateListing = async (id, data) => {
  const { title, description, imageUrl, metadata, categoryId } = data;
  
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
  if (metadata !== undefined) updateData.metadata = metadata;
  if (categoryId !== undefined) updateData.categoryId = Number(categoryId);

  return await prisma.listing.update({
    where: { id: Number(id) },
    data: updateData,
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  });
};

/**
 * Delete a listing.
 * @param {number} id 
 * @returns {Promise<object>}
 */
const deleteListing = async (id) => {
  return await prisma.listing.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing
};
