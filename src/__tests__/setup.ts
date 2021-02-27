import { setupDatabaseTest, teardownDatabaseTest } from './helpers';

beforeAll(async () => {
  console.log('SETUP DATABASE TEST');
  await setupDatabaseTest();
});

afterAll(async () => {
  console.log('DESTROY DATABASE TEST');
  await teardownDatabaseTest();
});
