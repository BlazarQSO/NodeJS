import { Types } from 'mongoose';
import { CartEntity, ICart } from './cart.interfaces';
import { Cart } from './cart.models';

class CartRepository {
  getCarts = async (): Promise<CartEntity[]> => {
    const carts = await Cart.find();

    return carts;
  }

  getCart = async (id: Types.ObjectId): Promise<CartEntity | null> => {
    const cart = await Cart.findById(id);

    return cart;
  }

  createCart = async (cart: ICart): Promise<CartEntity> => {
    const newCart = new Cart(cart);
    await newCart.save();

    return newCart;
  }

  updateCart = async (cartEntity: CartEntity): Promise<CartEntity | null> => {
    const { _id, ...cart } = cartEntity;
    const updatedCart = await Cart.findByIdAndUpdate(_id, cart);

    return updatedCart;
  }

  deleteCart = async (id: Types.ObjectId): Promise<CartEntity | null> => {
    const deletedCart = await Cart.findByIdAndDelete(id);

    return deletedCart;
  }
}

export const cartRepository = new CartRepository();
