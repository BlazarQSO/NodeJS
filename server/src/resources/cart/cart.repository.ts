import { CartEntity, ICart } from './cart.interfaces';
import { Cart } from './cart.models';

class CartRepository {
  getCarts = async (): Promise<CartEntity[]> => {
    const carts = await Cart.find();
    console.log('carts', carts);

    return carts;
  }

  getCart = async (userId: string): Promise<CartEntity | null> => {
    const cart = await Cart.findById({ userId });

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

  deleteCart = async (id: string): Promise<CartEntity | null> => {
    const deletedCart = await Cart.findByIdAndDelete(id);

    return deletedCart;
  }
}

export const cartRepository = new CartRepository();
