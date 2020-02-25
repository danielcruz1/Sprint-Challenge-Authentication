const server = require('../api/server.js');
const request = require('supertest');
const db = require('../database/dbConfig.js');

describe('root', () => {
  test('environment should be testing', () => {
    expect(process.env.DB_ENV).toEqual('testing');
  });
});

describe('GET /', () => {
    
  it('should return 200 ok', async () => {
    const res = await request(server)
    .get('/');
    expect(res.status).toEqual(200);
  });

  it('should be json', async () => {
    const res = await request(server)
    .get('/');
    expect(res.type).toEqual('application/json');
  }),

  it('should return the right object', async () => {
    const res = await request(server)
    .get('/');
    expect(res.body).toEqual({ message: 'Welcome to your final Sprint Challenge this side of LABS!!!' });
  });
});

describe('/api/auth/register', () => {
  it('return status 500', async () => {
      const res = await request(server)
      .post('/api/auth/register')
      .send({ username: "Johnny10", password: "ilive" })
      expect(res.status).toEqual(500);
    });

    it('return json', async () => {
      const res = await request(server)
      .post('/api/auth/register')
      .send({ username: "Johnny5", password: "isalive" })
      expect(res.type).toEqual("application/json");
    });
});

describe('/api/auth/login', () => {
  it('return status 500', async () => {
    const res = await request(server)
    .post('/api/auth/login')
    .send({ username: "Johnny5", password: "isalive"})
    expect(res.status).toEqual(500);
    });

    it('return json', async () => {
      const res = await request(server)
      .post('/api/auth/login')
      .send({ username: "Johnny5", password: "isalive" })
      expect(res.type).toEqual("application/json");
    });
});