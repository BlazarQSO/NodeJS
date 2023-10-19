import { userRepository } from './user.repository';
import { IUser, UserEntity } from './user.interfaces';

export const getUsers = (): Promise<UserEntity[]> => userRepository.getUsers();

export const getUser = (id: number): Promise<UserEntity | undefined> => userRepository.getUser(id);

export const createUser = (user: IUser): Promise<UserEntity> => userRepository.createUser(user);

export const updateUser = (user: UserEntity): Promise<UserEntity | undefined> => userRepository.updateUser(user);

export const deleteUser = (id: number): Promise<boolean> => userRepository.deleteUser(id);
