const db = require('../config/db');

// Table activités
db.run(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT,
    distance REAL,
    duration INTEGER,
    points INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    path TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

module.exports = db;