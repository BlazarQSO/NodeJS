import { Router } from 'express';
import * as cartService from './cart.service';
import { StatusCode } from '../../constants';
import { auth } from '../../middleware/auth.middleware';
import { CustomRequest } from '../../types/declaration';
import { schemaUpdateCart } from '../../validators/cart.validations';
import { createValidator } from 'express-joi-validation'

const validator = createValidator();
const cartRouter = Router();

// admin role
cartRouter.get('/cart/all', async (_, res): Promise<void> => {
  const carts = await cartService.getCarts();

  res.status(StatusCode.OK).send(carts);
});

// auth
cartRouter.post('/cart', async (req: CustomRequest, res): Promise<void> => {
  const cart = await cartService.getCart(Number(req.body.userId));

  res.status(StatusCode.OK).send(cart);
});

cartRouter.post('/user/cart/', auth, async (req, res): Promise<void> => {
  const cart = await cartService.createCart(req.body);

  res.status(StatusCode.CREATED).send(cart);
});

// auth
cartRouter.put('/cart', validator.body(schemaUpdateCart), async (req, res): Promise<void> => {
  const updatedCart = await cartService.updateCart(req.body);

  res.status(StatusCode.OK).send(updatedCart);
});

cartRouter.delete('/cart/', auth, async (req: CustomRequest, res): Promise<void> => {
  await cartService.deleteCart(Number(req.body.id));

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { cartRouter };
