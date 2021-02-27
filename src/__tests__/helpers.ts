import { connectInDatabase } from '@app/database';
import { Connection, getConnection } from 'typeorm';

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
