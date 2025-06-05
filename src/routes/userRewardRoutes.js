const express = require('express');
const router = express.Router();
const userRewardController = require('../controllers/userRewardController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, userRewardController.unlockReward);
router.get('/', authenticateToken, userRewardController.getUnlockedRewards);

module.exports = router;
