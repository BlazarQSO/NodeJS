import { UUID } from 'crypto';
import { cartDb } from '../../database';
import { CartEntity } from './cart.interfaces';

export const getCarts = async (): Promise<CartEntity[]> => {
  const carts = await cartDb.getCarts();
  return carts;
};

export const getCart = async (userId: UUID): Promise<CartEntity | undefined> => {
  const cart = await cartDb.getCart(userId);
  return cart;
};

export const createCart = async (cart: CartEntity): Promise<CartEntity> => {
  const carts = await cartDb.createCart(cart);
  return carts;
};

export const updateCart = async (cart: CartEntity): Promise<CartEntity | undefined> => {
  const updatedCart = await cartDb.updateCart(cart);
  return updatedCart;
}

export const deleteCart = async (userId: UUID): Promise<void> => {
  await cartDb.deleteCart(userId);
};
