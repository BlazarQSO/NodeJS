import { Types } from 'mongoose';

export interface ICart {
  userId: Types.ObjectId;
  isDeleted?: boolean;
}

export interface CartEntity extends ICart {
  _id: Types.ObjectId;
}
