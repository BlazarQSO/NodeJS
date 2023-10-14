import { UUID } from 'crypto';
import { User } from '../resources/user/user.model';
import { updateEntity, delayDb } from '../utils';
import { defaultUserDb } from '../constants';

class UserDB {
  users: User[]

  constructor(users: User[] = defaultUserDb) {
    this.users = users;
  }

  async getUser(userId: UUID): Promise<User | undefined> {
    await delayDb();

    return await this.findUser(userId);;
  }

  async getUsers(): Promise<User[]> {
    await delayDb();

    return this.users;
  }

  async createUser(user: User): Promise<User> {
    await delayDb();

    this.users.push(user);
    return user;
  }

  async updateUser(user: User): Promise<User | undefined> {
    await delayDb();

    const updatedUser = await this.findUser(user.id);

    if (updatedUser) {
      return updateEntity(updatedUser, user);
    }
  }

  async deleteUser(userId: UUID): Promise<void> {
    await delayDb();

    this.users = this.users.filter(({ id }) => id !== userId);
  }

  async findUser(userId: UUID): Promise<User | undefined> {
    await delayDb();

    return this.users.find(({ id }) => id === userId);
  }

  async findUserByEmail(emailUser: string): Promise<User | undefined> {
    await delayDb();
    console.log('findUserByEmail', emailUser);
    console.log('findUserByEmail this.users', this.users);

    return this.users.find(({ email }) => email === emailUser);
  }

  async findUserByLogin(loginUser: string): Promise<User | undefined> {
    await delayDb();
    console.log('findUserByEmail', loginUser);
    console.log('findUserByEmail this.users', this.users);

    return this.users.find(({ login }) => login === loginUser);
  }
}

export const userDb = new UserDB();
