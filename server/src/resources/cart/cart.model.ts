import { UUID, randomUUID } from 'crypto';
import { CartEntity, ICart, CartItemEntity } from './cart.interfaces';

export class Cart implements CartEntity {
  id: UUID;
  userId: UUID;
  items: CartItemEntity[];

  constructor({ userId, items = [] }: ICart) {
    this.id = randomUUID();
    this.userId = userId;
    this.items = items;
  }
}
