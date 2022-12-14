import { Router } from 'express';

import { userController } from '../controllers/userController';

const userRouter = Router();

// Add user's id
userRouter.post('/add', userController.add);

export { userRouter };
