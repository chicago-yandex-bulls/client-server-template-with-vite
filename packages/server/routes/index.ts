import { Router } from 'express';

import { topicRouter } from './topicRouter';
import { userRouter } from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/topic', topicRouter);

export { router };
