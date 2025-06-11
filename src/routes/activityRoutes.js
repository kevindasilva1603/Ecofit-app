const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, (req, res, next) => {
  console.log('Route POST /api/activities appelée par user:', req.user);
  next();
}, activityController.createActivity);

router.get('/', authenticateToken, (req, res, next) => {
  console.log('Route GET /api/activities appelée par user:', req.user);
  next();
}, activityController.getUserActivities);

module.exports = router;
