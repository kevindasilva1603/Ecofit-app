const db = require('../config/db');

// Création de la table avec la colonne points
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = {
  create: (email, hashedPassword, callback) => {
    db.run(
      `INSERT INTO users (email, password, points) VALUES (?, ?, 0)`,
      [email, hashedPassword],
      function (err) {
        callback(err, this); // `this` contient lastID
      }
    );
  },

  findByEmail: (email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  addPoints: (id, amount) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET points = points + ? WHERE id = ?`,
        [amount, id],
        function (err) {
          if (err) return reject(err);
          resolve(true);
        }
      );
    });
  },

  decrementPoints: (id, amount) => {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE users SET points = points - ? WHERE id = ?`,
        [amount, id],
        function (err) {
          if (err) return reject(err);
          resolve(true);
        }
      );
    });
  }
};
