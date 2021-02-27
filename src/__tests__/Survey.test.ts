import app from '@app/app';
import supertest from 'supertest';
import { setupDatabaseTest } from './helpers';

const request = supertest(app);

describe('Survey', () => {
  beforeAll(async () => {
    await setupDatabaseTest();
  });

  it('Should able create a new survey', async () => {
    const response = await request.post('/surveys').send({ title: 'test@gmail.com', description: 'Test' });
    expect(response.status).toBe(201);
  });
  it('Should get all surveys', async () => {
    const response = await request.get('/surveys');
    expect(response.body).toBeInstanceOf(Array);
  });
});
