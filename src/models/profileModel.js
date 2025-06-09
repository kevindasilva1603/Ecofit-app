const db = require('../config/db');

db.run(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    name TEXT,
    age INTEGER,
    weight REAL,
    height REAL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

module.exports = db;
