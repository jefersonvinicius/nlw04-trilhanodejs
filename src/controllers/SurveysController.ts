import { Survey } from '@app/models/Survey';
import { Request, Response } from 'express';

export class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const survey = Survey.create({
      title,
      description,
    });

    await survey.save();

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const all = await Survey.find();
    return response.json(all);
  }
}
