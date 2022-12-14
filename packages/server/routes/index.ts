import { Router } from 'express';

import { themeRouter } from './themeRouter';
import { userRouter } from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/theme', themeRouter);

export { router };
