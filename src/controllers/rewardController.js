// src/controllers/rewardController.js
const db = require('../models/rewardModel');

exports.createReward = (req, res) => {
  const { name, description, points_required } = req.body;

  db.run(`
    INSERT INTO rewards (name, description, points_required)
    VALUES (?, ?, ?)`,
    [name, description, points_required],
    function (err) {
      if (err) return res.status(500).json({ message: 'Erreur création récompense.' });
      res.status(201).json({ id: this.lastID });
    });
};

exports.getAllRewards = (req, res) => {
  db.all(`SELECT * FROM rewards`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Erreur récupération récompenses.' });
    res.json(rows);
  });
};

exports.deleteReward = (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM rewards WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ message: 'Erreur suppression récompense.' });
    res.json({ message: 'Récompense supprimée.' });
  });
};
