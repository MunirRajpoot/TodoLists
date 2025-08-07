const express = require('express');
const router = express.Router();
const { signup, login, validateToken } = require('../controller/authController.js');
const authMiddleware = require('../middleware/authMiddleware'); 

// Route for user signup
router.post('/register', signup);

// Route for user login
router.post('/login', login);

// ✅ Route to validate user
router.get('/validate', authMiddleware, validateToken);

module.exports = router;
