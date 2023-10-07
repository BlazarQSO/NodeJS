import { UUID } from 'crypto';
import { updateEntity, delayDb } from '../utils';
import { defaultCartDb } from '../constants';
import { Cart } from '../resources/cart/cart.model';

class CartDB {
  carts: Cart[]

  constructor(carts: Cart[] = defaultCartDb) {
    this.carts = carts;
  }

  async getCart(currentUserId: UUID): Promise<Cart | undefined> {
    await delayDb();

    return this.findCart(currentUserId);
  }

  async getCarts(): Promise<Cart[]> {
    await delayDb();

    return this.carts;
  }

  async createCart(cart: Cart): Promise<Cart> {
    await delayDb();

    this.carts.push(cart);
    return cart;
  }

  async updateCart(cart: Cart): Promise<Cart | undefined> {
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

  findCart(currentUserId: UUID): Cart | undefined {
    return this.carts.find(({ userId }) => userId === currentUserId);
  }
}

export const cartDb = new CartDB();
