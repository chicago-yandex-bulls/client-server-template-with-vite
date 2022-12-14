import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../error/ApiError';
import { createSequelizeErrorMes } from '../error/createSequelizeErrorMes';
import { Theme } from '../models/models';

class ThemeController {
  async set(req: Request, res: Response, next: NextFunction) {
    const { id, theme } = req.body;

    await Theme.create({
      userId: id,
      theme,
    })
      .then(theme => {
        res.json(theme);
        console.log('SUCCESS');
      })
      .catch((e: Error) => {
        next(ApiError.badRequest(createSequelizeErrorMes(e)));
      });
  }

  async get(req: Request<{ id: number }>, res: Response, next: NextFunction) {
    const { id } = req.query;

    if (!id) {
      next(ApiError.badRequest('Не задан id'));

      return;
    }

    const theme = await Theme.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.json(theme);
  }
}

export const themeController = new ThemeController();
