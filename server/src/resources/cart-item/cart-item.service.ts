import { cartItemRepository } from './cart-item.repository';
import { ICartItem, CartItemEntity } from './cart-item.interfaces';
import { Types } from 'mongoose';

export const getAllCartItems = (): Promise<CartItemEntity[]> => cartItemRepository.getAllCartItems();

export const getCartItems = (
  cartId: Types.ObjectId,
): Promise<CartItemEntity[] | null> => cartItemRepository.getCartItems(cartId);

export const getCartItem = (
  id: Types.ObjectId,
): Promise<CartItemEntity | null> => cartItemRepository.getCartItem(id);

export const createCartItem = (cartItem: ICartItem): Promise<CartItemEntity> => {
  return cartItemRepository.createCartItem(cartItem);
}

export const updateCartItem = (
  cartItem: CartItemEntity,
): Promise<CartItemEntity | null> => cartItemRepository.updateCartItem(cartItem);

export const deleteCartItem = (
  id: Types.ObjectId,
): Promise<CartItemEntity | null> => cartItemRepository.deleteCartItem(id);
