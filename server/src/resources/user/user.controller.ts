import express from 'express';
import * as userService from './user.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';

const userRouter = express.Router();

userRouter.get('/', async (_, res): Promise<void> => {
  const users = await userService.getUsers();

  res.status(StatusCode.OK).send(users);
});

userRouter.get('/:id', async (req, res): Promise<void> => {
  const user = await userService.getUser(req.params.id as unknown as Types.ObjectId);

  if (user) {
    res.status(StatusCode.OK).send(user);
  } else {
    res.status(StatusCode.NOT_FOUND);
  }
});

userRouter.post('/', async (req, res): Promise<void> => {
  const user = await userService.createUser(req.body);

  res.status(StatusCode.CREATED).send({ user });
});

userRouter.put('/:id', async (req, res): Promise<void> => {
  const user = await userService.updateUser({ ...req.body, _id: req.params.id });

  res.status(StatusCode.OK).send(user);
});

userRouter.delete('/:id', async (req, res): Promise<void> => {
  await userService.deleteUser(req.params.id as unknown as Types.ObjectId);

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { userRouter };
