const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('NGO', () => {
  beforeEach(() => {
    connection.migrate.rollback();
    connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('It should create a new NGO', async () => {
    const response = await request(app)
      .post('/ngos')
      .send({
        name: 'NGO',
        email: 'contact@ngo.com',
        whatsapp: '99999999999',
        city: 'Toronto',
        pa: 'ON'
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
