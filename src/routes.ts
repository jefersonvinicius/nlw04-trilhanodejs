import { Router } from 'express';
import { UsersController } from '@app/controllers/UsersController';
import { SurveysController } from './controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';
import { AnswerSurveyController } from './controllers/AnswerSurveyController';

const router = Router();

const userController = new UsersController();
const surveysController = new SurveysController();
const sendEmailController = new SendMailController();
const answerSurveyController = new AnswerSurveyController();

router.post('/users', userController.create);
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);
router.post('/send-email', sendEmailController.execute);
router.get('/surveys/answer/:value', answerSurveyController.handle);

export { router };
