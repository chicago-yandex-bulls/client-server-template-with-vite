import { Router } from 'express';

import { commentRouter } from './commentRouter';
import { otherRouter } from './otherRouter';
import { topicRouter } from './topicRouter';

const router = Router();

router.use('/comment', commentRouter);
router.use('/topic', topicRouter);
router.use('/*', otherRouter);

export { router };
