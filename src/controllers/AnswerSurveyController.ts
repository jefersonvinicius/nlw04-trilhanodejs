import { AppError } from '@app/errors/AppError';
import { Evaluation } from '@app/models/Evaluation';
import { Request, Response } from 'express';

export class AnswerSurveyController {
  async handle(request: Request, response: Response) {
    const value = request.params.value;
    const evaluationId = request.query.u;

    const evaluation = await Evaluation.findOne({ where: { id: evaluationId } });
    if (!evaluation) {
      throw new AppError('evaluation does not exists!', 404);
    }

    evaluation.value = Number(value);
    await evaluation.save();

    return response.json(evaluation);
  }
}
