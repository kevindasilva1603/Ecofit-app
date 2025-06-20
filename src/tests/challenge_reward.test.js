const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

let token;

beforeAll((done) => {
  const email = 'test@eco.com';
  const password = 'secret123';
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run('INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function () {
    const userId = this.lastID || 1;
    token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    db.run('INSERT OR IGNORE INTO rewards (name, description, cost) VALUES (?, ?, ?)', [
      'Réduction vélo',
      '5% sur un vélo électrique',
      50,
    ]);

    done();
  });
});

describe('Challenge & Reward API', () => {
  it('récupère la liste des challenges', async () => {
    const res = await request(app)
      .get('/api/challenges')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("permet à un utilisateur de réclamer une récompense", async () => {
    const res = await request(app)
      .post('/api/user-rewards')
      .set('Authorization', `Bearer ${token}`)
      .send({ reward_id: 1 });

    console.log('Réponse:', res.statusCode, res.body);
    expect([200, 201]).toContain(res.statusCode);
  });
});
