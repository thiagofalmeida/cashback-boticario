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

    expect(user.body).toEqual(
      expect.objectContaining({
        cpf: '08045698742',
        email: 'acrico@testes.com.br',
      }),
    );

    const response = await request(app).post('/users').send({
      cpf: '08045698742',
      email: 'acrico@testes.com.br',
    });

    expect(response.status).toBe(400);
  });
});
