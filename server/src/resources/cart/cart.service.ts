import { CartEntity, ICart } from './cart.interfaces';
import { cartRepository } from './cart.repository';

export const getCarts = (): Promise<CartEntity[]> => cartRepository.getCarts();

export const getCart = (id: number): Promise<CartEntity | undefined> => cartRepository.getCart(id);

export const createCart = (cart: ICart): Promise<CartEntity> => cartRepository.createCart(cart);

export const updateCart = (cart: CartEntity): Promise<CartEntity | undefined> => cartRepository.updateCart(cart);

export const deleteCart = (id: number): Promise<boolean> => cartRepository.deleteCart(id);
