import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../error/ApiError';

class TopicController {
  async create(_req: Request, _res: Response) {
    //
  }

  async getAll(_req: Request, res: Response) {
    //TODO
    res.json('aadsf');
  }

  async get(req: Request<{ id: number }>, res: Response, next: NextFunction) {
    //TODO
    const { id } = req.query;

    if (!id) {
      console.log('start');
      next(ApiError.badRequest('Не задан id'));
      console.log('proc');

      return;
    }

    console.log('end');

    res.json(id);
  }
}

export const topicController = new TopicController();
