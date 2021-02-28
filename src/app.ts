import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { router } from '@app/routes';
import middlewares from './middlewares';

const app = express();

app.use(express.json());
app.use(router);
app.use(middlewares.catchErrors);

export default app;
