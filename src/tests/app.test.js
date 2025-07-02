// tests/app.test.js
const request = require('supertest');
const app = require('../app'); // ou le chemin vers ton app Express
const sqlite3 = require('sqlite3');
const fs = require('fs');

let token = '';
let userId;
let activityId;

describe('🌿 API ECO-fit - Tests Intégration Backend', () => {
  const testEmail = 'test@example.com';
  const testPassword = '123456';

  beforeAll(async () => {
    // Attendre un peu pour laisser le serveur démarrer la base
    await new Promise(res => setTimeout(res, 500));
  });

  it('✅ 1 - Inscription utilisateur', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('✅ 2 - Connexion utilisateur', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('✅ 3 - Création activité', async () => {
    const res = await request(app)
      .post('/api/activities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'course',
        distance: 3.5,
        duration: 20,
        points: 30,
        path: [{ lat: 48.85, lng: 2.35 }],
        photo: null
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    activityId = res.body.id;
  });

  it('✅ 4 - Vérification des points utilisateur', async () => {
    const res = await request(app)
      .get('/api/points')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('points');
    expect(res.body.points).toBeGreaterThanOrEqual(30); // Activité ajoutée
  });

  it('✅ 5 - Création d\'une récompense', async () => {
    const res = await request(app)
      .post('/api/rewards')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Badge Vert',
        description: 'Récompense test',
        points_required: 20
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('✅ 6 - Déblocage récompense', async () => {
    const allRewards = await request(app)
      .get('/api/rewards')
      .set('Authorization', `Bearer ${token}`);

    const reward = allRewards.body.find(r => r.name === 'Badge Vert');
    expect(reward).toBeDefined();

    const res = await request(app)
      .post('/api/user-rewards')
      .set('Authorization', `Bearer ${token}`)
      .send({ reward_id: reward.id });

    expect(res.statusCode).toBe(201);
  });

  it('✅ 7 - Lecture des activités', async () => {
    const res = await request(app)
      .get('/api/activities')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
