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

// Table des récompenses débloquées par utilisateur
// manque la colonne cost
db.run(`
  CREATE TABLE IF NOT EXISTS user_rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    reward_id INTEGER,
    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(reward_id) REFERENCES rewards(id)
  )
`);

module.exports = db;
