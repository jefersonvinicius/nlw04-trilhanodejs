import { Evaluation } from '@app/models/Evaluation';
import { Request, Response } from 'express';
import { IsNull, Not } from 'typeorm';

export class CalculateNPSController {
  async calculate(request: Request, response: Response) {
    const surveyId = request.params.surveyId;

    const evaluations = await Evaluation.find({
      where: { surveyId, value: Not(IsNull()) },
    });

    const detractors = evaluations.filter((evaluation) => evaluation.value <= 6).length;
    const promoters = evaluations.filter((evaluation) => evaluation.value >= 9).length;
    const passives = evaluations.filter((evaluation) => evaluation.value >= 7 && evaluation.value <= 8).length;
    const totalAnswers = evaluations.length;

    const nps = (((promoters - detractors) / totalAnswers) * 100).toFixed(2);

    return response.json({ detractors, promoters, passives, totalAnswers, nps: Number(nps) });
  }
}
