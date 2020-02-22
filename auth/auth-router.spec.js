const server = require('../api/server.js');
const request = require('supertest');
// const db = require('../database/dbConfig.js');

describe('root', () => {
  test('environment should be testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('GET /', () => {
    
  it('should return 200 ok', async () => {
    const res = await request(server)
    .get('/');
    
    expect(res.status).toBe(200);
  });

  it('should be json', async () => {
    const res = await request(server)
    .get('/');

    expect(res.type).toBe('application/json');
  }),

  it('should return the right object', async () => {
    const res = await request(server)
    .get('/');

    expect(res.body).toEqual({ message: 'Welcome to your final Sprint Challenge this side of LABS!!!' });
  });
});