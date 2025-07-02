const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

// Auth
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected route: get points
router.get('/points', authenticateToken, userController.getUserPoints);

module.exports = router;
