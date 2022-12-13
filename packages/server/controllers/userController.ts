import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../error/ApiError';
import { createSequelizeErrorMes } from '../error/createSequelizeErrorMes';
import { User } from '../models/models';

class UserController {
  async add(req: Request, res: Response, next: NextFunction) {
    //todo add id
    const { first_name, second_name, display_name, login, email, phone, avatar } = req.body;
    await User.create({
      first_name,
      second_name,
      display_name,
      login,
      email,
      phone,
      avatar,
    })
      .then(user => {
        res.json(user);
        console.log('SUCCESS');
      })
      .catch((e: Error) => {
        next(ApiError.badRequest(createSequelizeErrorMes(e)));
      });
  }

  async get(req: Request, res: Response) {
    const users = await User.findAll({
      where: {
        id: req.params.id,
      },
    });

    return res.json(users);
  }

  async update(_req: Request, _res: Response) {
    //
  }
}

export const userController = new UserController();
