const db = require('../models/activityModel');

exports.createActivity = (req, res) => {
  const { type, distance, duration, points, path } = req.body;
  const userId = req.user.id;

  db.run(
    `INSERT INTO activities (user_id, type, distance, duration, points, path)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, type, distance, duration, points || 0, JSON.stringify(path || [])],
    function (err) {
      if (err) return res.status(500).json({ message: 'Erreur création activité.' });
      res.status(201).json({ id: this.lastID });
    }
  );
};

exports.getUserActivities = (req, res) => {
  const userId = req.user.id;
  db.all(
    `SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erreur récupération activités.' });
      res.json(rows);
    }
  );
};
