import { connectInDatabase } from '@app/database';
import { createQueryBuilder, EntityTarget, QueryRunner, Repository } from 'typeorm';

export async function setupDatabaseTest() {
  const connection = await connectInDatabase();
  await connection.runMigrations();
}

export async function clearTable(entity: EntityTarget<unknown>) {
  await createQueryBuilder().delete().from(entity).execute();
}
