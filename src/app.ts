import 'reflect-metadata';
import express from 'express';
import { router } from '@app/routes';

const app = express();

app.use(express.json());
app.use(router);

export default app;
