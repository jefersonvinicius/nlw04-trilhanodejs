import app from '@app/app';
import supertest from 'supertest';
import { createEvaluation, createSurvey, createUsers } from './_helpers';

const request = supertest(app);

describe('NPS suite tests', () => {
  it.only('Should calculate nps', async () => {
    const users = await createUsers(100);
    const survey = await createSurvey();
    for (const [index, user] of users.entries()) {
      const value = getValue(index);
      await createEvaluation(survey.id, user.id, value);
    }
    const response = await request.get(`/surveys/${survey.id}/nps`);
    expect(response.body).toMatchObject({
      detractors: 30,
      promoters: 40,
      passives: 30,
      totalAnswers: 100,
      nps: 10,
    });
  });
});

function getValue(index: number) {
  if (index < 30) {
    return 4;
  }
  if (index >= 30 && index < 60) {
    return 7;
  }

  return 9;
}
