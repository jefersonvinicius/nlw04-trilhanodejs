import { User } from '@app/models/User';
import { Request, Response } from 'express';

export class UsersController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = User.create({
      name,
      email,
    });

    await user.save();

    return response.status(201).json(user);
  }
}
