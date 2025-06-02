// src/config/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../data/ecofit.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur ouverture base SQLite:', err.message);
  } else {
    console.log('✅ Connexion à la base SQLite réussie !');
  }
});

module.exports = db;
