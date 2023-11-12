import { Router } from 'express';
import * as cartService from './cart.service';
import { StatusCode } from '../../constants';
import { schemaUpdateCart } from '../../validators/cart.validations';
import { createValidator } from 'express-joi-validation'
import { Types } from 'mongoose';
import { logger, loggerWrite } from '../../logger/logger';

const validator = createValidator();
const cartRouter = Router();

cartRouter.get('/cart', async (req, res): Promise<void> => {
  logger.profile('get-carts');
  const carts = await cartService.getCarts();
  loggerWrite(req, 'get-carts');

  res.status(StatusCode.OK).send(carts);
});

cartRouter.get('/cart/:id', async (req, res): Promise<void> => {
  logger.profile('get-cart-by-id');
  const cart = await cartService.getCart(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'get-cart-by-id');

  res.status(StatusCode.OK).send(cart);
});

cartRouter.post('/cart', async (req, res): Promise<void> => {
  logger.profile('create-cart');
  const cart = await cartService.createCart(req.body);
  loggerWrite(req, 'create-cart');

  res.status(StatusCode.CREATED).send(cart);
});

cartRouter.put('/cart/:id', validator.body(schemaUpdateCart), async (req, res): Promise<void> => {
  logger.profile('update-cart');
  const updatedCart = await cartService.updateCart({ ...req.body, _id: req.params.id });
  loggerWrite(req, 'update-cart');

  res.status(StatusCode.OK).send(updatedCart);
});

cartRouter.delete('/cart/:id', async (req, res): Promise<void> => {
  logger.profile('delete-cart');
  await cartService.deleteCart(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'delete-cart');

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { cartRouter };
