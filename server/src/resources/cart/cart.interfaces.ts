import { Types } from 'mongoose';

export interface ICart {
  userId: string;
  isDeleted?: boolean;
}

export interface CartEntity extends ICart {
  _id: string | Types.ObjectId;
}
