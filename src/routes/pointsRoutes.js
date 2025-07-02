const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');

// GET /api/points
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    res.json({ points: user.points });
  } catch (error) {
    console.error('Erreur GET /points:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/points/decrement
router.post('/decrement', authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Montant invalide' });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    if (user.points < amount) {
      return res.status(400).json({ error: 'Pas assez de points' });
    }

    await User.decrementPoints(req.user.id, amount);
    res.json({ success: true });
  } catch (error) {
    console.error('Erreur POST /points/decrement:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
