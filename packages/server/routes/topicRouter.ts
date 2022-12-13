import { Router } from 'express';

import { topicController } from '../controllers/topicController';

const topicRouter = Router();

// Получить все топики
topicRouter.get('/', topicController.getAll);
// Получить топик по id
topicRouter.get('/:id', topicController.get);

// Создать топик
topicRouter.post('/', topicController.create);

export { topicRouter };
