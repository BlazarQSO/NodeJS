import { Router } from 'express';
import * as cartService from './cart.service';
import { StatusCode } from '../../constants';
import { schemaUpdateCart } from '../../validators/cart.validations';
import { createValidator } from 'express-joi-validation'
import { Types } from 'mongoose';

const validator = createValidator();
const cartRouter = Router();

cartRouter.get('/cart', async (_, res): Promise<void> => {
  const carts = await cartService.getCarts();

  res.status(StatusCode.OK).send(carts);
});

cartRouter.get('/cart/:id', async (req, res): Promise<void> => {
  const cart = await cartService.getCart(req.params.id as unknown as Types.ObjectId);

  res.status(StatusCode.OK).send(cart);
});

cartRouter.post('/cart', async (req, res): Promise<void> => {
  const cart = await cartService.createCart(req.body);

  res.status(StatusCode.CREATED).send(cart);
});

cartRouter.put('/cart/:id', validator.body(schemaUpdateCart), async (req, res): Promise<void> => {
  const updatedCart = await cartService.updateCart({ ...req.body, _id: req.params.id });

  res.status(StatusCode.OK).send(updatedCart);
});

cartRouter.delete('/cart/:id', async (req, res): Promise<void> => {
  await cartService.deleteCart(req.params.id as unknown as Types.ObjectId);

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { cartRouter };
