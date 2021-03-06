const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('POST /api/auth/register', () => {
  it('should return 201 OK', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'lambda',
        password: 'school'
      });
    expect(res.status).toBe(201);
  });

  it('should return username: joe', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'joe',
        password: 'blow'
      });
    expect(res.body.username).toBe('joe');
  });
});

describe('POST /api/auth/login', () => {
  it('should return 401 for non-registered', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'notregistered',
        password: 'notregistered'
      });
    expect(res.status).toBe(401);
  });

  it('should return 200 for registered', async () => {
    const user = {
      username: 'john',
      password: 'pass'
    };

    const req = await request(server)
      .post('/api/auth/register')
      .send(user);

    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'john',
        password: 'pass'
      });
    expect(res.status).toBe(200);
  });
});

beforeEach(async () => {
  await db('users').truncate();
});
