import { AppError } from '@app/errors/AppError';
import { TemplateBuilder } from '@app/helpers/views';
import { Evaluation } from '@app/models/Evaluation';
import { Survey } from '@app/models/Survey';
import { User } from '@app/models/User';
import { EmailService } from '@app/services/EmailService';
import { Request, Response } from 'express';

export class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, surveyId } = request.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError('user does not exists!', 404);
    }

    const survey = await Survey.findOne(surveyId);
    if (!survey) {
      throw new AppError('survey does not exists!', 404);
    }

    let evaluation = await Evaluation.findOne({ where: { userId: user.id, surveyId } });
    if (!evaluation) {
      evaluation = Evaluation.create({
        surveyId: surveyId,
        userId: user.id,
      });
      await evaluation.save();
    }

    const surveyEmailBody = TemplateBuilder.buildSurveyTemplate({
      evaluationId: evaluation.id,
      baseURL: 'http://localhost:3333',
    });

    const emailResponse = await EmailService.send(user.email, 'Pesquisa', surveyEmailBody);

    return response.status(200).json({ evaluationId: evaluation.id, ...emailResponse });
  }
}
