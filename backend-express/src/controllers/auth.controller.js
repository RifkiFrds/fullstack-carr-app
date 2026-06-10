const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

/**
 * Handle POST /api/auth/login
 */
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    if (error.message === 'Invalid password') {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Handle GET /api/auth/me
 */
const me = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await authService.getUserById(userId);
    return res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: user
    });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  login,
  me
};
