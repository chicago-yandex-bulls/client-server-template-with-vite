import { Router } from 'express';

import { commentController } from '../controllers/commentController';

const commentRouter = Router();

// Добавить комментарий
commentRouter.post('/add', commentController.add);

// Получить все комментарии
commentRouter.get('/', commentController.get);

export { commentRouter };
