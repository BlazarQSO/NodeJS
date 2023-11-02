import { Schema, model } from 'mongoose';
import { IOrder } from './order.interfaces';

const schema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, required: true },
  paymentType: { type: String, required: true },
  deliveryType: { type: String, required: true },
  address: { type: String, allowNull: false },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
});

export const Order = model<IOrder>('orders', schema);
