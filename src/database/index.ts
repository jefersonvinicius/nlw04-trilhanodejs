import { createConnection, getConnectionOptions } from 'typeorm';

export async function connectInDatabase() {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ? 'nlw04_test' : defaultOptions.database,
    })
  );
}
