import { UUID } from 'crypto';
import { userDb } from '../../database';
import { User } from './user.model';

export const getUsers = async (): Promise<User[]> => {
  const users = await userDb.getUsers();
  return users;
};

export const getUser = async (id: UUID): Promise<User | undefined> => {
  const user = await userDb.getUser(id);
  return user;
};

export const createUser = async (user: User): Promise<User> => {
  const users = await userDb.createUser(user);
  return users;
};

export const updateUser = async (user: User): Promise<User | undefined> => {
  const updatedUser = await userDb.updateUser(user);
  return updatedUser;
}

export const deleteUser = async (id: UUID): Promise<void>  => {
  await userDb.deleteUser(id);
};
