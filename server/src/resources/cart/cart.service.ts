import { CartEntity, ICart } from './cart.interfaces';
import { cartRepository } from './cart.repository';

export const getCarts = (): Promise<CartEntity[]> => cartRepository.getCarts();

export const getCart = (id: string): Promise<CartEntity | null> => cartRepository.getCart(id);

export const createCart = (cart: ICart): Promise<CartEntity> => cartRepository.createCart(cart);

export const updateCart = (cart: CartEntity): Promise<CartEntity | null> => cartRepository.updateCart(cart);

export const deleteCart = (id: string): Promise<CartEntity | null> => cartRepository.deleteCart(id);
