const db = require('../models/profileModel');

exports.getProfile = (req, res) => {
  const userId = req.user.id;
  db.get(`SELECT * FROM profiles WHERE user_id = ?`, [userId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Erreur lecture profil.' });
    res.json(row || {});
  });
};

exports.createOrUpdateProfile = (req, res) => {
  const userId = req.user.id;
  const { name, age, weight, height } = req.body;

  db.get(`SELECT * FROM profiles WHERE user_id = ?`, [userId], (err, row) => {
    if (err) return res.status(500).json({ message: 'Erreur lecture profil.' });

    if (row) {
      db.run(
        `UPDATE profiles SET name = ?, age = ?, weight = ?, height = ? WHERE user_id = ?`,
        [name, age, weight, height, userId],
        function (err) {
          if (err) return res.status(500).json({ message: 'Erreur mise à jour profil.' });
          res.json({ message: 'Profil mis à jour.' });
        }
      );
    } else {
      db.run(
        `INSERT INTO profiles (user_id, name, age, weight, height) VALUES (?, ?, ?, ?, ?)`,
        [userId, name, age, weight, height],
        function (err) {
          if (err) return res.status(500).json({ message: 'Erreur création profil.' });
          res.json({ message: 'Profil créé.' });
        }
      );
    }
  });
};