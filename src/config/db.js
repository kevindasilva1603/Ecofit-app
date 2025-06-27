const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database.sqlite'), (err) => {
  if (err) {
    console.error('Erreur ouverture DB:', err);
  } else {
    console.log('Connexion à la base SQLite réussie !');
  }
});

// Table users
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Table activities
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
  photo TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
)
`);

// ✅ Table rewards avec cost

db.run(`
  CREATE TABLE IF NOT EXISTS rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    cost INTEGER NOT NULL
  )
`);


// Table user_rewards
db.run(`
  CREATE TABLE IF NOT EXISTS user_rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    reward_id INTEGER NOT NULL,
    claimed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, reward_id)
  )
`);

// Table challenges
db.run(`
  CREATE TABLE IF NOT EXISTS challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    target INTEGER NOT NULL,
    reward TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
