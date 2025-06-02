const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run( `INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ message: 'Utilisateur déjà existant.' });
      }
      res.status(201).json({ id: this.lastID, email });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, email: user.email });
  });
};