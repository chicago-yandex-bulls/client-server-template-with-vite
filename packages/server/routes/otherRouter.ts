import { NextFunction, Request, Response, Router } from 'express';

import { ApiError } from '../error/ApiError';

const otherRouter = Router();

const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(ApiError.notFound('Not Found'));
};

otherRouter.post('/*', notFoundHandler);

otherRouter.get('/*', notFoundHandler);

otherRouter.put('/*', notFoundHandler);

otherRouter.delete('/*', notFoundHandler);

export { otherRouter };
