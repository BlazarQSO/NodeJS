import { Router } from 'express';
import * as cartItemService from './cart-item.service';
import { StatusCode } from '../../constants';

const cartItemRouter = Router();

cartItemRouter.get('/cart/items', async (_, res): Promise<void> => {
  const cartItems = await cartItemService.getAllCartItems();

  res.status(StatusCode.OK).send(cartItems);
});

cartItemRouter.post('/cart/items', async (req, res): Promise<void> => {
  const cartItems = await cartItemService.getCartItems(req.body.cartId);

  res.status(StatusCode.OK).send(cartItems);
});

cartItemRouter.post('/cart/item', async (req, res): Promise<void> => {
  const cartItem = await cartItemService.getCartItem(req.body.id);

  res.status(StatusCode.OK).send(cartItem);
});

cartItemRouter.post('/cart/item/create', async (req, res): Promise<void> => {
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
