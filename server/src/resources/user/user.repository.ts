import { User } from './user.models';
import { IUser, UserEntity } from './user.interfaces';

class UserRepository {
  getUsers = async (): Promise<UserEntity[]> => {
    const users = await User.find();

    return users;
  }

  getUser = async (id: string): Promise<UserEntity | null> => {
    const user = await User.findById(id);

    return user;
  }

  createUser = async (user: IUser): Promise<UserEntity> => {
    const newUser = new User(user);
    await newUser.save();

    return newUser;
  }

  updateUser = async (userEntity: UserEntity): Promise<UserEntity | null> => {
    const { _id, ...user } = userEntity;
    const updatedUser = await User.findByIdAndUpdate(_id, user);

    return updatedUser;
  }

  deleteUser = async (id: string): Promise<UserEntity | null>  => {
    const deletedUser = await User.findByIdAndDelete(id);

    return deletedUser;
  }
}

export const userRepository = new UserRepository();
