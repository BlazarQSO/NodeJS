import * as userRepository from './user.repository';
import { User } from './user.model';
import { UUID } from 'crypto';

export const getUsers = (): Promise<User[]> => userRepository.getUsers();

export const getUser = (id: UUID): Promise<User | undefined> => userRepository.getUser(id);

export const createUser = (user: User): Promise<User> => userRepository.createUser(new User(user));

export const updateUser = (user: User): Promise<User | undefined> => userRepository.updateUser(user);

export const deleteUser = (id: UUID): Promise<void> => userRepository.deleteUser(id);
