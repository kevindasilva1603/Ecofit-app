// src/controllers/challengeController.js
const db = require('../models/challengeModel');

exports.createChallenge = (req, res) => {
  const { title, description, goal_type, goal_value, start_date, end_date } = req.body;

  db.run(`
    INSERT INTO challenges (title, description, goal_type, goal_value, start_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, goal_type, goal_value, start_date, end_date],
    function (err) {
      if (err) return res.status(500).json({ message: 'Erreur création défi.' });
      res.status(201).json({ id: this.lastID });
    });
};

exports.getAllChallenges = (req, res) => {
  db.all(`SELECT * FROM challenges`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Erreur récupération défis.' });
    res.json(rows);
  });
};

exports.deleteChallenge = (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM challenges WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ message: 'Erreur suppression défi.' });
    res.json({ message: 'Défi supprimé.' });
  });
};