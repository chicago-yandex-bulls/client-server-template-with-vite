import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../error/ApiError';
import { createSequelizeErrorMes } from '../error/createSequelizeErrorMes';
import { Comment } from '../models/models';

class CommentController {
  async add(req: Request, res: Response, next: NextFunction) {
    const { content, authorId, topicId } = req.body.data;
    await Comment.create({
      content,
      authorId,
      topicId,
    })
      .then(async topic => {
        res.json({ topic });
      })
      .catch((e: Error) => {
        next(ApiError.badRequest(createSequelizeErrorMes(e)));
      });
  }

  async get(req: Request, res: Response) {
    const { topicId } = req.query;
    const comments = await Comment.findAll({
      where: {
        id: topicId,
      },
    });

    return res.json(comments);
  }
}

export const commentController = new CommentController();
