import { UUID, randomUUID } from 'crypto';
import { CartEntity, ICart, CartItemEntity } from './cart.interfaces';

export class Cart implements CartEntity {
  id: UUID;
  userId: UUID;
  isDeleted: boolean;
  items: CartItemEntity[];

  constructor({ userId, isDeleted = false, items = [] }: ICart) {
    this.id = randomUUID();
    this.userId = userId;
    this.isDeleted = isDeleted;
    this.items = items;
  }
}
