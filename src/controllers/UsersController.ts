import { AppError } from '@app/errors/AppError';
import { User } from '@app/models/User';
import { Request, Response } from 'express';
import * as yup from 'yup';

export class UsersController {
  async create(request: Request, response: Response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
    });

    try {
      await schema.validate(request.body);
    } catch (error) {
      throw new AppError(error.message, 400);
    }

    const { name, email } = request.body;
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new AppError('user already exists', 409);
    }

    const user = User.create({
      name,
      email,
    });

    await user.save();

    return response.status(201).json(user);
  }
}
