import { cartItemRepository } from './cart-item.repository';
import { ICartItem, CartItemEntity } from './cart-item.interfaces';

export const getAllCartItems = (): Promise<CartItemEntity[]> => cartItemRepository.getAllCartItems();

export const getCartItems = (
  cartId: number,
): Promise<CartItemEntity[] | undefined> => cartItemRepository.getCartItems(cartId);

export const getCartItem = (id: number): Promise<CartItemEntity | undefined> => cartItemRepository.getCartItem(id);

export const createCartItem = (cartItem: ICartItem): Promise<CartItemEntity> => {
  return cartItemRepository.createCartItem(cartItem);
}

export const updateCartItem = (
  cartItem: CartItemEntity,
): Promise<CartItemEntity | undefined> => cartItemRepository.updateCartItem(cartItem);

export const deleteCartItem = (id: number): Promise<boolean> => cartItemRepository.deleteCartItem(id);
