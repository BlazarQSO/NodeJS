import { userRepository } from './user.repository';
import { IUser, UserEntity } from './user.interfaces';
import { Types } from 'mongoose';

export const getUsers = (): Promise<UserEntity[]> => userRepository.getUsers();

export const getUser = (id: Types.ObjectId): Promise<UserEntity | null> => userRepository.getUser(id);

export const createUser = (user: IUser): Promise<UserEntity> => userRepository.createUser(user);

export const updateUser = (user: UserEntity): Promise<UserEntity | null> => userRepository.updateUser(user);

export const deleteUser = (id: Types.ObjectId): Promise<UserEntity | null> => userRepository.deleteUser(id);
