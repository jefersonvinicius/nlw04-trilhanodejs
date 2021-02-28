import { connectInDatabase } from '@app/database';
import { getConnection } from 'typeorm';
import faker from 'faker';
import { User } from '@app/models/User';
import { Survey } from '@app/models/Survey';
import { Evaluation } from '@app/models/Evaluation';

export async function setupDatabaseTest() {
  const connection = await connectInDatabase();
  await connection.runMigrations();
  return connection;
}

export async function teardownDatabaseTest() {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.close();
}

export async function createUsers(amount = 1) {
  const users: User[] = [];
  for await (const _ of Array(amount)) {
    const user = User.create({
      email: faker.internet.email(),
      name: faker.name.firstName(),
    });
    users.push(user);
  }

  const usersSaved = await User.save(users);
  return usersSaved;
}

export async function createSurvey() {
  const survey = Survey.create({
    description: faker.lorem.paragraph(),
    title: faker.lorem.lines(1),
  });
  await survey.save();
  return survey;
}

export async function createEvaluation(surveyId: string, userId: string, value?: number) {
  const evaluation = Evaluation.create({
    surveyId,
    userId,
    value,
  });
  await evaluation.save();
  return evaluation;
}
