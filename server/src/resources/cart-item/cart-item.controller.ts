import { Router } from 'express';
import * as cartItemService from './cart-item.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';

const cartItemRouter = Router();

cartItemRouter.get('/cart/items/all', async (_, res): Promise<void> => {
  const cartItems = await cartItemService.getAllCartItems();

  res.status(StatusCode.OK).send(cartItems);
});

cartItemRouter.get('/cart/cartItems/:cartId', async (req, res): Promise<void> => {
  const cartItems = await cartItemService.getCartItems(req.params.cartId as unknown as Types.ObjectId);

  res.status(StatusCode.OK).send(cartItems);
});

cartItemRouter.get('/cart/items/:id', async (req, res): Promise<void> => {
  const cartItem = await cartItemService.getCartItem(req.params.id as unknown as Types.ObjectId);

  res.status(StatusCode.OK).send(cartItem);
});

cartItemRouter.post('/cart/item', async (req, res): Promise<void> => {
  const cartItem = await cartItemService.createCartItem(req.body);

  res.status(StatusCode.CREATED).send(cartItem);
});

cartItemRouter.put('/cart/item', async (req, res): Promise<void> => {
  const cartItem = await cartItemService.updateCartItem(req.body);

  res.status(StatusCode.OK).send(cartItem);
});

cartItemRouter.delete('/cart/item', async (req, res): Promise<void> => {
  await cartItemService.deleteCartItem(req.body.id);

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { cartItemRouter };
