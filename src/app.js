const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const userRewardRoutes = require('./routes/userRewardRoutes');
const profileRoutes = require('./routes/profileRoutes');
const pointsRoutes = require('./routes/pointsRoutes')
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/user-rewards', userRewardRoutes);
app.use('/api/user-rewards', userRewardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/points', pointsRoutes);
module.exports = app;
