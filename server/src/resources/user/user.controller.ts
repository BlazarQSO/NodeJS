import express from 'express';
import * as userService from './user.service';
import { StatusCode } from '../../constants';
import { CustomRequest } from '../../types/declaration';
import { deleteCart, createCart } from '../cart/cart.service';

const userRouter = express.Router();

// admin role
userRouter.get('/', async (_, res): Promise<void> => {
  const users = await userService.getUsers();
  res.status(StatusCode.OK).send(users);
});

// auth admin role
userRouter.get('/:id', async (req: CustomRequest, res): Promise<void> => {
  const user = await userService.getUser(Number(req.params.id));

  if (user) {
    res.status(StatusCode.OK).send(user);
  } else {
    res.status(StatusCode.NOT_FOUND);
  }
});

userRouter.post('/', async (req, res): Promise<void> => {
  const user = await userService.createUser(req.body);
  const cart = await createCart({ userId: Number(user.id), isDeleted: false });

  res.status(StatusCode.CREATED).send({ user, cart });
});

userRouter.put('/', async (req: CustomRequest, res): Promise<void> => {
  const user = await userService.updateUser(req.body);

  res.status(StatusCode.OK).send(user);
});

userRouter.delete('/', async (req: CustomRequest, res): Promise<void> => {
  await userService.deleteUser(req.body.id);
  await deleteCart(req.body.id);

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { userRouter };
