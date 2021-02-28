import { AppError } from '@app/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export class CatchErrorMiddleware {
  static handle(error: any, request: Request, response: Response, next: NextFunction) {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }
    if (error) {
      return response.status(500).json({ message: 'Internal error' });
    }
    next();
  }
}
