const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, rewardController.createReward);
router.get('/', authenticateToken, rewardController.getAllRewards);
router.delete('/:id', authenticateToken, rewardController.deleteReward);

module.exports = router;
