const { app } = require('./app');
const supertest = require('supertest');
const mongoose = require('mongoose');
let token;
describe('app', () => {
  beforeAll(async () => {});

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /register', () => {
    it('Should return Bad request', async () => {
      const response = await supertest(app).post('/user/register').send({
        email: 'invalidEmail',
        password: 123456,
        role: 'user',
        name: 'Farrukh',
      });

      expect(response.status).toBe(401);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.error).toBe('Bad request');
    });
  });
  describe('POST /login', () => {
    it('Should return user with token', async () => {
      const response = await supertest(app).post('/user/login').send({
        email: 'email@email.com',
        password: 'Farrukh123456',
      });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.email).toBe('email@email.com');
      expect(response.body.name).toBe('Farrukh');
      token = response.body.token;
    });
    it('Should return error: Unauthorized', async () => {
      const response = await supertest(app).post('/user/login').send({
        email: 'email@email.com',
        password: 'invalid password',
      });

      expect(response.status).toBe(401);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.error).toBe('Unauthorized');
    });
  });
  describe('GET /accounts', () => {
    it('Should return accounts of user', async () => {
      const response = await supertest(app)
        .get('/accounts')
        .set({ Authorization: `Bearer ${token}` });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body[0].currency).toBe('UZD');
      expect(response.body[0].title).toBe('My updated account');
    });
  });
  describe('POST /accounts', () => {
    it('Should return a new account of user', async () => {
      const response = await supertest(app)
        .post('/accounts')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          title: 'New created account',
          currency: 'UZD',
          amount: 5000,
        });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.currency).toBe('UZD');
      expect(response.body.title).toBe('New created account');
      expect(response.body.amount).toBe(5000);
    });

    it('Should fail (Unauthorized)', async () => {
      const response = await supertest(app)
        .post('/accounts')
        .set({ Authorization: 'Unauthorized' })
        .send({
          title: 'New created account',
          currency: 'UZD',
          amount: 5000,
        });

      expect(response.status).toBe(401);
    });

    it('Should fail Bad request', async () => {
      const response = await supertest(app)
        .post('/accounts')
        .set({ Authorization: `Bearer ${token}` })
        .send({
          title: 'New created account',
          currency: 'UZD',
          amount: 'this should be number',
        });

      expect(response.status).toBe(400);
      expect(response.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(response.body.error).toBe('Bad request');
    });
  });
});
