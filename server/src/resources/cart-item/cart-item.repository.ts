import { Types } from 'mongoose';
import { ICartItem, CartItemEntity } from './cart-item.interfaces';
import { CartItem } from './cart-item.models';

class CartItemRepository {
 getAllCartItems = async (): Promise<CartItemEntity[]> => {
    const allCartItems = await CartItem.find();

    return allCartItems;
  }

  getCartItems = async (cartId: Types.ObjectId): Promise<CartItemEntity[] | null> => {
    const cartItems = await CartItem.find({ cartId });

    return cartItems;
  }

  getCartItem = async (id: Types.ObjectId): Promise<CartItemEntity | null> => {
    const cartItem = await CartItem.findById(id);

    return cartItem;
  }

  createCartItem = async (cartItem: ICartItem): Promise<CartItemEntity> => {
    const newCartItem = new CartItem(cartItem);
    await newCartItem.save();

    return newCartItem;
  }

  updateCartItem = async (cartItemEntity: CartItemEntity): Promise<CartItemEntity | null> => {
    const { _id, ...cartItem } = cartItemEntity;
    const updatedCartItem = await CartItem.findByIdAndUpdate(_id, cartItem);

    return updatedCartItem;
  }

  deleteCartItem = async (id: Types.ObjectId): Promise<CartItemEntity | null> => {
    const deletedCartItem = await CartItem.findByIdAndDelete(id);

    return deletedCartItem;
  }
}

export const cartItemRepository = new CartItemRepository();
