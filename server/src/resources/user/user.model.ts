import { UUID, randomUUID } from 'crypto';
import { IUser, UserEntity } from './user.interfaces';

export class User implements UserEntity {
  id: UUID;
  login: string;
  email: string;
  password: string;

  constructor({ login, email, password }: IUser) {
    this.id = randomUUID();
    this.login = login;
    this.email = email;
    this.password = password;
  }
}
