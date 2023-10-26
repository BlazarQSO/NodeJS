import { Schema, model } from 'mongoose';
import { ICart } from './cart.interfaces';

const schema = new Schema<ICart>({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, defaultValue: false },
});

export const Cart = model<ICart>('carts', schema);
