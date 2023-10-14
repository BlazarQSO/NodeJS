import { Router } from 'express';
import * as cartService from './cart.service';
import { StatusCode, messages } from '../../constants';
import { UUID } from 'crypto';
import { auth } from '../../middleware/auth.middleware';
import { CustomRequest } from '../../types/declaration';
import { ActionUpdateCart, CartEntity, CartItemEntity } from './cart.interfaces';
import { getCart } from './cart.service';
import { getProduct } from '../product/product.repository';
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
  const cart = await cartService.getCart(req.body.userId as UUID);
  // const cart = await cartService.getCart(req?.userAuth as UUID);
  res.status(StatusCode.OK).send(cart);
});

cartRouter.post('/user/cart/', auth, async (req, res): Promise<void> => {
  const cart = await cartService.createCart(req.body);
  res.status(StatusCode.CREATED).send(cart);
});

// auth
cartRouter.put('/cart', validator.body(schemaUpdateCart), async (req, res): Promise<void> => {
  const { userId, productId, count, action } = req.body;
  const updatedCart = await getCart(userId) as CartEntity;

  if (!updatedCart) {
    res.status(StatusCode.BAD_REQUEST).json({ message: messages.cartIsNotFound });
  }
  console.log('userId, productId, count, action', userId, productId, count, action);
  switch (action) {
    case ActionUpdateCart.RESET_CART: {
      updatedCart.userId = userId;
      updatedCart.items = [];
      break;
    }
    case ActionUpdateCart.DELETE_ITEM: {
      updatedCart.items = updatedCart?.items?.filter(({ product }) => product.id !== productId) || [];
      break;
    }
    case ActionUpdateCart.ADD_ITEM: {
      const cartItem = updatedCart?.items?.find(({ product }) => product.id === productId);
      const product = await getProduct(productId);

      if (!cartItem) {
        updatedCart?.items?.push({product: { ...product }, count } as CartItemEntity);
      } else {
        cartItem.count += count;
      }

      break;
    }
    default: {
      const cartItem = updatedCart?.items?.find(({ product }) => product.id === productId);
      if (cartItem) {
        cartItem.count = count;
      }
    }
  }

  const cart = await cartService.updateCart(updatedCart as CartEntity);
  // const cart = await cartService.updateCart({ ...req.body, userId: req.userAuth });
  res.status(StatusCode.OK).send(cart);
});

cartRouter.delete('/cart/', auth, async (req: CustomRequest, res): Promise<void> => {
  await cartService.deleteCart(req.userAuth as UUID);
  res.sendStatus(StatusCode.NO_CONTENT);
});

export { cartRouter };
