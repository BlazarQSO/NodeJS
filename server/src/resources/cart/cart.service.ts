import { CartEntity, ICart } from './cart.interfaces';
import { Cart } from './cart.model';
import * as cartRepository from './cart.repository';
import { UUID } from 'crypto';

export const getCarts = (): Promise<CartEntity[]> => cartRepository.getCarts();

export const getCart = (id: UUID): Promise<CartEntity | undefined> => cartRepository.getCart(id);

export const createCart = (cart: ICart): Promise<CartEntity> => cartRepository.createCart(new Cart(cart));

export const updateCart = (cart: CartEntity): Promise<CartEntity | undefined> => cartRepository.updateCart(cart);

export const deleteCart = (id: UUID): Promise<void> => cartRepository.deleteCart(id);
