const express = require('express');
const router = express.Router();
const { signup, login, validateToken } = require('../controller/authController.js');
const authMiddleware = require('../middleware/authMiddleware');

// User registration (password will already be SHA-256 hashed from frontend, then bcrypt hashed here)
router.post('/register', signup);

// User login (frontend sends SHA-256 hashed password, backend compares after bcrypt)
router.post('/login', login);

// Validate token (checks JWT and returns user data)
router.get('/validate', authMiddleware, validateToken);

module.exports = router;
