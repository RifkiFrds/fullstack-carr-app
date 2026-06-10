const prisma = require('../../prisma/client');

/**
 * Retrieve all categories.
 * @returns {Promise<Array>}
 */
const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });
};

/**
 * Retrieve a specific category by ID.
 * @param {number} id 
 * @returns {Promise<object|null>}
 */
const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id: Number(id) }
  });
};

/**
 * Retrieve a specific category by Slug.
 * @param {string} slug 
 * @returns {Promise<object|null>}
 */
const getCategoryBySlug = async (slug) => {
  return await prisma.category.findUnique({
    where: { slug }
  });
};

/**
 * Create a new category.
 * @param {object} data 
 * @returns {Promise<object>}
 */
const createCategory = async (data) => {
  const { name, slug, description } = data;
  return await prisma.category.create({
    data: {
      name,
      slug,
      description
    }
  });
};

/**
 * Update an existing category.
 * @param {number} id 
 * @param {object} data 
 * @returns {Promise<object>}
 */
const updateCategory = async (id, data) => {
  const { name, slug, description } = data;
  return await prisma.category.update({
    where: { id: Number(id) },
    data: {
      name,
      slug,
      description
    }
  });
};

/**
 * Delete a category.
 * @param {number} id 
 * @returns {Promise<object>}
 */
const deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: { id: Number(id) }
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
};
