const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  User.create(email, hashedPassword, (err, result) => {
    if (err) {
      console.error('Erreur lors de l’enregistrement :', err);
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }
    res.status(201).json({ id: result.lastID, email, points: 0 });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
  }

  User.findByEmail(email, (err, user) => {
    if (err) {
      console.error('Erreur base de données :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      email: user.email,
      points: user.points ?? 0,
    });
  });
};

exports.getUserPoints = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    res.json({ points: user.points ?? 0 });
  } catch (error) {
    console.error('Erreur récupération points :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
