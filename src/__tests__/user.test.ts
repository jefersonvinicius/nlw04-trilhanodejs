import supertest from 'supertest';
import app from '@app/app';

const request = supertest(app);

describe('User', () => {
  it('Should able create a new user', async () => {
    const response = await request.post('/users').send({ email: 'test@gmail.com', name: 'Test' });
    expect(response.status).toBe(201);
  });
  it('Should able create a new user', async () => {
    const response = await request.post('/users').send({ email: 'test@gmail.com', name: 'Test' });
    expect(response.status).toBe(400);
  });
});
