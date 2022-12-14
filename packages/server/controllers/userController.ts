import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../error/ApiError';
import { createSequelizeErrorMes } from '../error/createSequelizeErrorMes';
import { User } from '../models/models';

class UserController {
  async add(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    await User.create({
      userId: id,
    })
      .then(user => {
        res.json(user);
        console.log('SUCCESS');
      })
      .catch((e: Error) => {
        next(ApiError.badRequest(createSequelizeErrorMes(e)));
      });
  }
}

export const userController = new UserController();
