import { Schema, model } from 'mongoose';
import { IUser } from './user.interfaces';

const schema = new Schema<IUser>({
  login: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, defaultValue: 'USER' },
});

export const User = model<IUser>('users', schema);
