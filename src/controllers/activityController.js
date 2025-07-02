const db = require('../models/activityModel');
const User = require('../models/userModel'); // Pour ajouter les points

exports.createActivity = (req, res) => {
  const { type, distance, duration, points, path, photo } = req.body;
  const userId = req.user.id;

  console.log('📥 Requête création activité:', { userId, type, distance, duration, points, path, photo });

  if (!type || distance == null) {
    console.warn('❌ Type ou distance manquants');
    return res.status(400).json({ message: 'Type et distance obligatoires' });
  }

  db.run(
    `INSERT INTO activities (user_id, type, distance, duration, points, path, photo)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, type, distance, duration || 0, points || 0, JSON.stringify(path || []), photo || null],
    async function (err) {
      if (err) {
        console.error('❌ Erreur création activité:', err);
        return res.status(500).json({ message: 'Erreur création activité' });
      }

      try {
        if (points && points > 0) {
          await User.addPoints(userId, points);
          console.log(`✅ ${points} points ajoutés à l'utilisateur ${userId}`);
        }

        console.log('✅ Activité créée ID:', this.lastID);
        res.status(201).json({ id: this.lastID });
      } catch (error) {
        console.error('❌ Erreur ajout points utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de l’ajout des points' });
      }
    }
  );
};

exports.getUserActivities = (req, res) => {
  const userId = req.user.id;

  db.all(
    `SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error('❌ Erreur récupération activités:', err);
        return res.status(500).json({ message: 'Erreur récupération activités.' });
      }

      res.json(rows);
    }
  );
};
