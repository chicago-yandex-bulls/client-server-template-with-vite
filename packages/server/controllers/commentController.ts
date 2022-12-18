import type { NextFunction, Request, Response } from 'express';

// import { Comment } from '../models/models';

class CommentController {
  async add(_req: Request, _res: Response, _next: NextFunction) {
    //  add comment
  }

  async get(_req: Request, _res: Response, _next: NextFunction) {
    //  get comments
  }
}

export const commentController = new CommentController();
