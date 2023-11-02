import { Schema, model } from 'mongoose';
import { ICart } from './cart.interfaces';

const schema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  isDeleted: { type: Boolean, defaultValue: false },
});

export const Cart = model<ICart>('carts', schema);
