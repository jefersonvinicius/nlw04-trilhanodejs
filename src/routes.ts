import { Router } from 'express';
import { UsersController } from '@app/controllers/UsersController';
import { SurveysController } from './controllers/SurveysController';

const router = Router();

const userController = new UsersController();
const surveysController = new SurveysController();

router.post('/users', userController.create);
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);

export { router };
