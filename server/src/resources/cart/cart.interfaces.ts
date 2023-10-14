import { UUID } from 'crypto';
import { ProductEntity } from '../product/product.interfaces';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface ICart {
  userId: UUID;
  items?: CartItemEntity[];
}

export interface CartEntity extends ICart {
  id: UUID;
}

export enum ActionUpdateCart {
  ADD_ITEM = 'add_item',
  RESET_CART = 'reset_cart',
  DELETE_ITEM = 'delete_item',
  UPDATE_ITEM = 'update_item',
}
