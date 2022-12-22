import { Router } from 'express';

import { topicController } from '../controllers/topicController';

const topicRouter = Router();

// Получить все топики
topicRouter.get('/', topicController.getAll);

// Создать топик
topicRouter.post('/add', topicController.create);

export { topicRouter };
