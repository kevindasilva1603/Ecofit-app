// src/models/challengeModel.js
const db = require('../config/db');

// Table des défis
db.run(`
  CREATE TABLE IF NOT EXISTS challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    goal_type TEXT,        -- 'distance' ou 'activités'
    goal_value INTEGER,
    start_date TEXT,
    end_date TEXT
  )
`);

module.exports = db;
