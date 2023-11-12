import { Router } from 'express';
import * as cartItemService from './cart-item.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';
import { logger, loggerWrite } from '../../logger/logger';

const cartItemRouter = Router();

cartItemRouter.get('/cart/items/all', async (req, res): Promise<void> => {
  logger.profile('get-cart-items');
  const cartItems = await cartItemService.getAllCartItems();
  loggerWrite(req, 'get-cart-items');

  res.status(StatusCode.OK).send(cartItems);
});

cartItemRouter.get('/cart/cartItems/:cartId', async (req, res): Promise<void> => {
  logger.profile('get-cart-items-by-cart-id');
  const cartItems = await cartItemService.getCartItems(req.params.cartId as unknown as Types.ObjectId);
  loggerWrite(req, 'get-cart-items-by-cart-id');

  res.status(StatusCode.OK).send(cartItems);
});

cartItemRouter.get('/cart/items/:id', async (req, res): Promise<void> => {
  logger.profile('get-cart-item-by-id');
  const cartItem = await cartItemService.getCartItem(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'get-cart-item-by-id');

  res.status(StatusCode.OK).send(cartItem);
});

cartItemRouter.post('/cart/item', async (req, res): Promise<void> => {
  logger.profile('create-cart-item');
  const cartItem = await cartItemService.createCartItem(req.body);
  loggerWrite(req, 'create-cart-item');

  res.status(StatusCode.CREATED).send(cartItem);
});

cartItemRouter.put('/cart/item', async (req, res): Promise<void> => {
  logger.profile('update-cart-item');
  const cartItem = await cartItemService.updateCartItem(req.body);
  loggerWrite(req, 'update-cart-item');

  res.status(StatusCode.OK).send(cartItem);
});

cartItemRouter.delete('/cart/item', async (req, res): Promise<void> => {
  logger.profile('delete-cart-item');
  await cartItemService.deleteCartItem(req.body.id);
  loggerWrite(req, 'delete-cart-item');

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { cartItemRouter };
