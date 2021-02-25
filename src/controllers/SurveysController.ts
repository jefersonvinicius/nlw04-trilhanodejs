import { SurveysRepository } from '@app/repositories/SurveysRepository';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

export class SurveysController {
  create = async (request: Request, response: Response) => {
    const { title, description } = request.body;
    const surveysRepository = getCustomRepository(SurveysRepository);
    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  };

  show = async (request: Request, response: Response) => {
    const surveysRepository = getCustomRepository(SurveysRepository);
    const all = await surveysRepository.find();
    return response.json(all);
  };
}
