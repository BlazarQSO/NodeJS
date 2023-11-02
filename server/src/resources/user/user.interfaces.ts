import { Types } from 'mongoose';

export interface IUser {
  login: string;
  email: string;
  password: string;
  role?: string;
}

export interface UserEntity extends IUser {
  _id: Types.ObjectId;
}
