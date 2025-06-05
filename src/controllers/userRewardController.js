const db = require('../models/rewardModel');

exports.unlockReward = (req, res) => {
  const userId = req.user.id;
  const { reward_id } = req.body;

  if (!reward_id) {
    return res.status(400).json({ message: 'reward_id requis' });
  }

  // Vérifier si l'utilisateur a déjà débloqué la récompense
  db.get(
    `SELECT * FROM user_rewards WHERE user_id = ? AND reward_id = ?`,
    [userId, reward_id],
    (err, row) => {
      if (row) {
        return res.status(409).json({ message: 'Récompense déjà débloquée' });
      }

      // Insérer le lien user/récompense
      db.run(
        `INSERT INTO user_rewards (user_id, reward_id) VALUES (?, ?)`,
        [userId, reward_id],
        function (err) {
          if (err) return res.status(500).json({ message: 'Erreur insertion' });
          res.status(201).json({ id: this.lastID, reward_id });
        }
      );
    }
  );
};

exports.getUnlockedRewards = (req, res) => {
  const userId = req.user.id;

  db.all(
    `
    SELECT r.id, r.name, r.description, r.points_required, ur.unlocked_at
    FROM user_rewards ur
    JOIN rewards r ON r.id = ur.reward_id
    WHERE ur.user_id = ?
    `,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erreur lecture' });
      res.json(rows);
    }
  );
};
