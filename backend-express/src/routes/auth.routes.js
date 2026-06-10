const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

// Validation schema for login
const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Routes
router.post('/login', validateLogin, authController.login);
router.get('/me', verifyToken, authController.me);

module.exports = router;
