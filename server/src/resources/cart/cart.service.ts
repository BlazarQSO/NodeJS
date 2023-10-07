import { Cart } from './cart.model';
import * as cartRepository from './cart.repository';
import { UUID } from 'crypto';

export const getCarts = (): Promise<Cart[]> => cartRepository.getCarts();

export const getCart = (id: UUID): Promise<Cart | undefined> => cartRepository.getCart(id);

export const createCart = (cart: Cart): Promise<Cart> => cartRepository.createCart(new Cart(cart));

export const updateCart = (user: Cart): Promise<Cart | undefined> => cartRepository.updateCart(user);

export const deleteCart = (id: UUID): Promise<void> => cartRepository.deleteCart(id);
