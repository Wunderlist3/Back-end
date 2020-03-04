const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  it('should set NODE_ENV to testing', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('GET /api', () => {
    // http status code
    it('should return 200 OK', async () => {
      const res = await request(server).get('/api');
      expect(res.status).toBe(200);
    });

    // format of data type (JSON)
    it('should return JSON', async () => {
      const res = await request(server).get('/api');
      expect(res.type).toBe('application/json');
    });

    // shape of the response
    it('should return { api: "up" }', async () => {
      const res = await request(server).get('/api');
      expect(res.body).toEqual({ api: 'up' });
    });
  });
});
