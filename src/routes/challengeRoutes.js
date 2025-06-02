// src/routes/challengeRoutes.js
const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, challengeController.createChallenge);
router.get('/', authenticateToken, challengeController.getAllChallenges);
router.delete('/:id', authenticateToken, challengeController.deleteChallenge);

module.exports = router;
// 