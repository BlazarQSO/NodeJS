import { Schema, model } from 'mongoose';
import { ICartItem } from './cart-item.interfaces';

const schema = new Schema<ICartItem>({
  cartId: { type: Schema.Types.ObjectId, required: true },
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
});

export const CartItem = model<ICartItem>('cartItems', schema);
