import { Types } from 'mongoose';

export interface IProduct {
  title: string;
  description: string;
  price: number;
  img: string;
}

export interface ProductEntity extends IProduct {
  _id: Types.ObjectId;
}
