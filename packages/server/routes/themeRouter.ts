import { Router } from 'express';

import { themeController } from '../controllers/themeController';

const themeRouter = Router();

// Get theme by userId
themeRouter.get('/:userId', themeController.get);

// Set theme
themeRouter.post('/', themeController.set);

export { themeRouter };
