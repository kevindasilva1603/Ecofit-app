// src/models/rewardModel.js
const db = require('../config/db');

// Table des récompenses
db.run(`
  CREATE TABLE IF NOT EXISTS rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    points_required INTEGER
  )
`);

module.exports = db;
