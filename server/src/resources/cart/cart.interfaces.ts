import { UUID } from 'crypto';
import { ProductEntity } from '../product/product.interfaces';

export interface ICart {
  userId: number;
  isDeleted?: boolean;
}

export interface CartEntity extends ICart {
  id: number;
}

export enum ActionUpdateCart {
  ADD_ITEM = 'add_item',
  RESET_CART = 'reset_cart',
  DELETE_ITEM = 'delete_item',
  UPDATE_ITEM = 'update_item',
}
