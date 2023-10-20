import { CartEntity, ICart } from './cart.interfaces';
import { defaultCartDb } from '../../constants';
import { CartDb } from '../../database/models.db';

class CartRepository {
  constructor() {
    const addDefaultUsers = async () => {
      setTimeout(() => {
        Promise.all(defaultCartDb.map(async ({ userId, isDeleted }) => {
          const found = await CartDb.findOne({
            where: {
              id: userId,
            },
          });
          !found && await CartDb.create({ userId, isDeleted });
        }));
      }, 10000);
    }

    addDefaultUsers();
  }

  getCarts = async (): Promise<CartEntity[]> => {
    const carts = await CartDb.findAll() as unknown as CartEntity[];

    return carts;
  }

  getCart = async (userId: number): Promise<CartEntity | undefined> => {
    const cart = await CartDb.findOne({
      where: { userId },
    }) as unknown as CartEntity;

    return cart;
  }

  createCart = async (cart: ICart): Promise<CartEntity> => {
    const newCart = await CartDb.create({ ...cart }) as unknown as CartEntity;

    return newCart;
  }

  updateCart = async (cart: CartEntity): Promise<CartEntity | undefined> => {
    const updatedCart = await CartDb.update(cart, {
      where: { id: cart.id },
    }) as unknown as CartEntity;

    return updatedCart;
  }

  deleteCart = async (id: number): Promise<boolean> => {
    const rowDeleted = await CartDb.destroy({
      where: { id },
    });

    return rowDeleted === 1;
  }
}

export const cartRepository = new CartRepository();
