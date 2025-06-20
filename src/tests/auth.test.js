const request = require('supertest');
const app = require('../app'); // <-- Ton fichier app.js/serveur
const db = require('../models/userModel');

describe('Tests Authentification', () => {
  beforeAll((done) => {
    db.run('DELETE FROM users', done); // Réinitialise la table pour éviter les conflits
  });

  it('doit enregistrer un utilisateur', async () => {
    const res = await request(app).post('/api/users/register').send({
      email: 'test@ecofit.fr',
      password: 'motdepasse123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('email', 'test@ecofit.fr');
  });

  it('doit se connecter avec un utilisateur existant', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'test@ecofit.fr',
      password: 'motdepasse123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('refuse une connexion avec mauvais mot de passe', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'test@ecofit.fr',
      password: 'mauvais'
    });
    expect(res.statusCode).toBe(401);
  });
});
