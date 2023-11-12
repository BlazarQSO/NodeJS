import express from 'express';
import * as userService from './user.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';
import { logger, loggerWrite } from '../../logger/logger';

const userRouter = express.Router();

userRouter.get('/', async (req, res): Promise<void> => {
  logger.profile('get-users');
  const users = await userService.getUsers();
  loggerWrite(req, 'get-users');

  res.status(StatusCode.OK).send(users);
});

userRouter.get('/:id', async (req, res): Promise<void> => {
  logger.profile('get-user-by-id');
  const user = await userService.getUser(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'get-user-by-id');

  if (user) {
    res.status(StatusCode.OK).send(user);
  } else {
    res.status(StatusCode.NOT_FOUND);
  }
});

userRouter.post('/', async (req, res): Promise<void> => {
  logger.profile('create-user');
  const user = await userService.createUser(req.body);
  loggerWrite(req, 'create-user');

  res.status(StatusCode.CREATED).send({ user });
});

userRouter.put('/:id', async (req, res): Promise<void> => {
  logger.profile('update-user');
  const user = await userService.updateUser({ ...req.body, _id: req.params.id });
  loggerWrite(req, 'update-user');

  res.status(StatusCode.OK).send(user);
});

userRouter.delete('/:id', async (req, res): Promise<void> => {
  logger.profile('delete-user');
  await userService.deleteUser(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'delete-user');

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { userRouter };
