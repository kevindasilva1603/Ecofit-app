const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database.sqlite'), (err) => {
  if (err) {
    console.error('Erreur ouverture DB:', err);
  } else {
    console.log('Connexion à la base SQLite réussie !');
  }
});

// Table activities avec colonne path ajoutée
db.run(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    distance REAL NOT NULL,
    duration INTEGER DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    path TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
