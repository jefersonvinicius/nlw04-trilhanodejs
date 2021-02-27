import app from './app';
import { connectInDatabase } from './database';

connectInDatabase().then(() => {
  app.listen(3333, () => {
    console.log('Serving...');
  });
});
