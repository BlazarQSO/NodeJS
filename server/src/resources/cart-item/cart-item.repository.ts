import { defaultCartItemDb } from '../../constants';
import { CartItemDb } from '../../database/models.db';
import { ICartItem, CartItemEntity } from './cart-item.interfaces';

class CartItemRepository {
  constructor() {
    const addDefaultCartItems = async () => {
      setTimeout(() => {
        Promise.all(defaultCartItemDb.map(async (cartItem) => {
          const found = await CartItemDb.findOne({
            where: {
              id: cartItem.id,
            },
          });
          !found && await CartItemDb.create({ ...cartItem });
        }));
      }, 15000);
    }
    addDefaultCartItems();
  }

  getAllCartItems = async (): Promise<CartItemEntity[]> => {
    const allCartItems = await CartItemDb.findAll() as unknown as CartItemEntity[];

    return allCartItems;
  }

  getCartItems = async (cartId: number): Promise<CartItemEntity[] | undefined> => {
    const cartItems = await CartItemDb.findOne({
      where: { cartId },
    }) as unknown as CartItemEntity[];

    return cartItems;
  }

  getCartItem = async (id: number): Promise<CartItemEntity | undefined> => {
    const cartItem = await CartItemDb.findOne({
      where: { id },
    }) as unknown as CartItemEntity;

    return cartItem;
  }

  createCartItem = async (cartItem: ICartItem): Promise<CartItemEntity> => {
    const newCartItem = await CartItemDb.create({ ...cartItem }) as unknown as CartItemEntity;

    return newCartItem;
  }

  updateCartItem = async (cartItem: CartItemEntity): Promise<CartItemEntity> => {
    const updatedCartItem = await CartItemDb.update(cartItem, {
      where: { id: cartItem.id },
    }) as unknown as CartItemEntity;

    return updatedCartItem;
  }

  deleteCartItem = async (id: number): Promise<boolean> => {
    const rowDeleted = await CartItemDb.destroy({
      where: { id }
    });

    return rowDeleted === 1;
  }
}

export const cartItemRepository = new CartItemRepository();
