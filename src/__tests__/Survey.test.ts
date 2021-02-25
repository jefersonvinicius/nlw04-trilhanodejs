import supertest from 'supertest';
import app from '@app/app';

import { Survey } from '@app/models/Survey';
import { clearTable, setupDatabaseTest } from './helpers';

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
    await clearTable(Survey);
    const response = await request.get('/surveys');
    expect(response.body).toBeInstanceOf(Array);
  });
});
