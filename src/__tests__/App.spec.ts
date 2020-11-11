import request from 'supertest';

import { Connection, getConnection } from 'typeorm';
import createConnection from '../shared/database/index';

import app from '../shared/http/app';

let connection: Connection;

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS orders');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM orders');
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Acricocrildo Josberanilson',
      cpf: '08045698742',
      email: 'acrico@testes.com.br',
      password: '123123123',
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        cpf: '08045698742',
        email: 'acrico@testes.com.br',
      }),
    );
  });

  it('should not be able to create a user with one e-mail thats already registered', async () => {
    const user = await request(app).post('/users').send({
      name: 'Acricocrildo Josberanilson',
      cpf: '08045698742',
      email: 'acrico@testes.com.br',
      password: '123123123',
    });

    const userTwo = await request(app).post('/users').send({
      name: 'Josberanilson Acricocrildo',
      cpf: user.body.cpf,
      email: user.body.email,
      password: '123123123',
    });

    expect(userTwo.status).toBe(400);
  });

  it('should not be able to authenticate a non-existent user', async () => {
    const session = await request(app).post('/sessions').send({
      email: 'non_existent_user@email.com',
      password: 'wrong-password',
    });

    expect(session.status).toBe(401);
  });

  it('should not be able to authenticate a user with wrong credentials', async () => {
    const user = await request(app).post('/users').send({
      name: 'Acricocrildo Josberanilson',
      cpf: '08045698742',
      email: 'acrico@testes.com.br',
      password: '123123123',
    });

    const session = await request(app).post('/sessions').send({
      email: user.body.email,
      password: 'wrong-password',
    });

    expect(session.status).toBe(401);
  });

  it('should be able to list the current cashback credit accumulation from a user', async () => {
    const user = await request(app).post('/users').send({
      name: 'Acricocrildo Josberanilson',
      cpf: '08045698742',
      email: 'acrico@testes.com.br',
      password: '123123123',
    });

    const session = await request(app).post('/sessions').send({
      email: user.body.email,
      password: '123123123',
    });

    const cashback = await request(app)
      .get('/cashback?cpf=08045698742')
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(cashback.body).toEqual(
      expect.objectContaining({
        cpf: '08045698742',
      }),
    );
  });

  it('should not be able to list the current cashback credit accumulation from a non-existent user', async () => {
    const user = await request(app).post('/users').send({
      name: 'Acricocrildo Josberanilson',
      cpf: '08045698742',
      email: 'acrico@testes.com.br',
      password: '123123123',
    });

    const session = await request(app).post('/sessions').send({
      email: user.body.email,
      password: '123123123',
    });

    const cashback = await request(app)
      .get('/cashback?cpf=123132132')
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(cashback.status).toBe(400);
  });
});
