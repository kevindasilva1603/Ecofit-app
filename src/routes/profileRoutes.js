const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, profileController.getProfile);
router.post('/', authenticateToken, profileController.createOrUpdateProfile);

module.exports = router;
