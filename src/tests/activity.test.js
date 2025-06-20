const request = require('supertest');
const app = require('../app'); // PAS server.js ❌
const db = require('../models/activityModel');
const jwt = require('jsonwebtoken');

const fakeUser = { id: 1, email: 'test@eco.com' };
const token = jwt.sign(fakeUser, process.env.JWT_SECRET, { expiresIn: '1h' });

describe('Activité API', () => {
  beforeAll((done) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT,
        distance REAL,
        duration INTEGER,
        points INTEGER,
        path TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      done
    );
  });

  it('ajoute une activité', async () => {
    const res = await request(app)
      .post('/api/activities')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'marche',
        distance: 1.5,
        duration: 15,
        points: 10,
        path: [],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it("récupère les activités de l'utilisateur", async () => {
    const res = await request(app)
      .get('/api/activities')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
