import { Types } from 'mongoose';

export interface ICartItem {
  cartId: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  count: number;
}

export interface CartItemEntity extends ICartItem {
  _id: string | Types.ObjectId;
}
