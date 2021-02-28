import { AppError } from '@app/errors/AppError';
import { Survey } from '@app/models/Survey';
import { Request, Response } from 'express';
import * as yup from 'yup';

export class SurveysController {
  async create(request: Request, response: Response) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      await schema.validate(request.body);
    } catch (error) {
      throw new AppError(error.message, 400);
    }

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
