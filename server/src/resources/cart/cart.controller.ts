import { Router } from 'express';
import * as cartService from './cart.service';
import { StatusCode } from '../../constants';
import { UUID } from 'crypto';
import { auth } from '../../middleware/auth.middleware';
import { CustomRequest } from '../../types/declaration';

const cartRouter = Router();

// admin role
cartRouter.get('/cart/all', async (_, res): Promise<void> => {
  const carts = await cartService.getCarts();
  res.status(StatusCode.OK).send(carts);
});

cartRouter.get('/cart', auth, async (req: CustomRequest, res): Promise<void> => {
  const cart = await cartService.getCart(req?.userAuth as UUID);
  res.status(StatusCode.OK).send(cart);
});

// the cart is created when the user registers
// cartRouter.post('/:userId/cart/', auth, async (req, res): Promise<void> => {
//   const cart = await cartService.createCart(req.body);
//   res.status(StatusCode.CREATED).send(cart);
// });

cartRouter.put('/cart', auth, async (req: CustomRequest, res): Promise<void> => {
  const cart = await cartService.updateCart({ ...req.body, userId: req.userAuth });
  res.status(StatusCode.OK).send(cart);
});

cartRouter.delete('/cart/', auth, async (req: CustomRequest, res): Promise<void> => {
  await cartService.deleteCart(req.userAuth as UUID);
  res.sendStatus(StatusCode.NO_CONTENT);
});

export { cartRouter };
