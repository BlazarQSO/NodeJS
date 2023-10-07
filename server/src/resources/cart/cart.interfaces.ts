import { UUID } from 'crypto';
import { ProductEntity } from '../product/product.interfaces';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface ICart {
  userId: UUID;
  isDeleted?: boolean;
  items?: CartItemEntity[];
}

export interface CartEntity extends ICart {
  id: UUID;
}
