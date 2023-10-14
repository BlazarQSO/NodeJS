import { UUID } from 'crypto';
import { updateEntity, delayDb } from '../utils';
import { defaultCartDb } from '../constants';
import { CartEntity } from '../resources/cart/cart.interfaces';

class CartDB {
  carts: CartEntity[]

  constructor(carts: CartEntity[] = defaultCartDb) {
    this.carts = carts;
  }

  async getCart(currentUserId: UUID): Promise<CartEntity | undefined> {
    await delayDb();

    return this.findCart(currentUserId);
  }

  async getCarts(): Promise<CartEntity[]> {
    await delayDb();

    return this.carts;
  }

  async createCart(cart: CartEntity): Promise<CartEntity> {
    await delayDb();

    this.carts.push(cart);
    return cart;
  }

  async updateCart(cart: CartEntity): Promise<CartEntity | undefined> {
    await delayDb();

    const updatedCart = this.findCart(cart.userId);

    if (updatedCart) {
      return updateEntity(updatedCart, cart);
    }
  }

  async deleteCart(currentUserId: UUID): Promise<void> {
    await delayDb();

    this.carts = this.carts.filter(({ userId }) => userId !== currentUserId);
  }

  findCart(currentUserId: UUID): CartEntity | undefined {
    return this.carts.find(({ userId }) => userId === currentUserId);
  }
}

export const cartDb = new CartDB();
