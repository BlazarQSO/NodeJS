import { UUID } from 'crypto';

export interface IUser {
  login: string;
  email: string;
  password: string;
}

export interface UserEntity extends IUser {
  id: UUID;
}
