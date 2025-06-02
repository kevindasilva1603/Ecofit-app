// src/controllers/activityController.js
const db = require('../models/activityModel');

function calculatePoints(type, distance, duration) {
  switch (type) {
    case 'marche': return Math.floor(distance * 5);
    case 'course': return Math.floor(distance * 10);
    case 'vélo':   return Math.floor(distance * 3);
    default: return 0;
  }
}

exports.addActivity = (req, res) => {
  const { type, distance, duration } = req.body;
  const userId = req.user.id;

  if (!type || !distance || !duration) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const points = calculatePoints(type, distance, duration);

  db.run(
    `INSERT INTO activities (user_id, type, distance, duration, points)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, type, distance, duration, points],
    function (err) {
      if (err) return res.status(500).json({ message: 'Erreur enregistrement activité.' });

      res.status(201).json({ id: this.lastID, type, distance, duration, points });
    }
  );
};

exports.getUserActivities = (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erreur récupération historique.' });

      res.json(rows);
    }
  );
};
