import { Schema, model } from 'mongoose';
import { IProduct } from './product.interfaces';

const schema = new Schema<IProduct>({
  title: { type: String, unique: true, allowNull: false },
  description: { type: String },
  price: { type: Number, allowNull: false },
  img: { type: String },
});

export const Product = model<IProduct>('products', schema);
