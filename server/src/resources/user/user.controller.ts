import express, { Request } from 'express';
import * as userService from './user.service';
import { StatusCode } from '../../constants';
import { UUID } from 'crypto';
import { IUser } from './user.interfaces';
import { createCart } from '../cart/cart.repository';
import { Cart } from '../cart/cart.model';
import { auth } from '../../middleware/auth.middleware';
import { CustomRequest } from '../../types/declaration';

const userRouter = express.Router();

// admin role
userRouter.get('/', async (_, res): Promise<void> => {
  const users = await userService.getUsers();
  res.status(StatusCode.OK).send(users);
});

userRouter.get('/', auth, async (req: CustomRequest, res): Promise<void> => {
  const user = await userService.getUser(req?.userAuth as UUID);
  res.status(StatusCode.OK).send(user);
});

// user is created during register
// userRouter.post('/', async (req, res): Promise<void> => {
//   const user = await userService.createUser(req.body);
//   await createCart(new Cart({ userId: user.id }));
//   res.status(StatusCode.CREATED).send(user);
// });

userRouter.put('/update', auth, async (req: CustomRequest, res): Promise<void> => {
  const user = await userService.updateUser({ id: req.userAuth as UUID, ...<IUser>req.body});
  res.status(StatusCode.OK).send(user);
});

userRouter.delete('/', async (req: CustomRequest, res): Promise<void> => {
  await userService.deleteUser(req.userAuth as UUID);
  res.sendStatus(StatusCode.NO_CONTENT);
});

export { userRouter };
