import { Router } from 'express';

import { userController } from '../controllers/userController';

const userRouter = Router();

// todo удалить, оставить только запрос
// Добавить нового пользователя в таблицу
userRouter.post('/add', userController.add);

// Получить пользователя по id
userRouter.get('/:id', userController.get);

// todo удалить, оставить только запрос
// Изменить данные пользователя
userRouter.put('/:id', userController.update);

export { userRouter };
