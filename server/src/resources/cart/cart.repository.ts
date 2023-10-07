import { UUID } from 'crypto';
import { cartDb } from '../../database';
import { Cart } from './cart.model';

export const getCarts = async (): Promise<Cart[]> => {
  const carts = await cartDb.getCarts();
  return carts;
};

export const getCart = async (userId: UUID): Promise<Cart | undefined> => {
  const cart = await cartDb.getCart(userId);
  return cart;
};

export const createCart = async (cart: Cart): Promise<Cart> => {
  const carts = await cartDb.createCart(cart);
  return carts;
};

export const updateCart = async (cart: Cart): Promise<Cart | undefined> => {
  const updatedCart = await cartDb.updateCart(cart);
  return updatedCart;
}

export const deleteCart = async (userId: UUID): Promise<void> => {
  await cartDb.deleteCart(userId);
};
