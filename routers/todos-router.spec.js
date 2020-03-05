const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('POST /api/todos/add', () => {
  it('should add a todo', async () => {
    const user = {
      username: 'jason',
      password: 'pass'
    };

    const req = await request(server)
      .post('/api/auth/register')
      .send(user);

    const res = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'jason',
        password: 'pass'
      });

    const addTodo = await request(server)
      .post('/api/todos/add')
      .set('authorization', res.body.token)
      .send({
        title: "Test Add",
        task: "See if it adds",
        setDate: "Monday",
        user_id: 1
      });
    
    expect(addTodo.status).toBe(201);
  });
});

beforeEach(async () => {
  await db('users').truncate();
  await db('todos').truncate();
});
