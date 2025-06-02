const db = require('../config/db');

// Création de la table des activités
db.run(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT,           -- 'marche', 'course', 'vélo'
    distance REAL,       -- en kilomètres
    duration INTEGER,    -- en minutes
    points INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

module.exports = db;
