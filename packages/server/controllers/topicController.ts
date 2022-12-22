import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../error/ApiError';
import { createSequelizeErrorMes } from '../error/createSequelizeErrorMes';
import { Topic } from '../models/models';

class TopicController {
  async create(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      { data: { title: string; content: string; authorId: string } }
    >,
    res: Response,
    next: NextFunction
  ) {
    const { title, content, authorId } = req.body.data;
    await Topic.create({
      title,
      content,
      authorId,
    })
      .then(async topic => {
        res.json({ topic });
      })
      .catch((e: Error) => {
        next(ApiError.badRequest(createSequelizeErrorMes(e)));
      });
  }

  async getAll(_req: Request, res: Response) {
    const users = await Topic.findAll();

    return res.json(users);
  }
}

export const topicController = new TopicController();
