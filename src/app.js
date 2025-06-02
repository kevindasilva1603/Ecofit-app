const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

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

module.exports = app;
