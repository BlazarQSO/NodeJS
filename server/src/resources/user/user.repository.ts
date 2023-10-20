import bcrypt from 'bcryptjs';
import { UserDb } from '../../database/models.db';
import { defaultUserDb } from '../../constants';
import { IUser, UserEntity } from './user.interfaces';
import { SALT } from '../../public.env';

class UserRepository {
  constructor() {
    const addDefaultUsers = async () => {
      setTimeout(() => {
        Promise.all(defaultUserDb.map(async ({ email, login, password }) => {
          const hashedPassword = await bcrypt.hash(password, SALT);
          const found = await UserDb.findOne({
            where: {
              email,
            },
          });
          !found && await UserDb.create({ email, login, password: hashedPassword });
        }));
      }, 2000);
    }

    addDefaultUsers();
  }

  getUsers = async (): Promise<UserEntity[]> => {
    const users = await UserDb.findAll() as unknown as UserEntity[];

    return users;
  }

  getUser = async (id: number): Promise<UserEntity | undefined> => {
    const user = await UserDb.findOne({
      where: { id },
    }) as unknown as UserEntity;

    return user;
  }

  createUser = async (user: IUser): Promise<UserEntity> => {
    const { login, email, password } = user;

    const users = await UserDb.create(
      { login, email, password }
    ) as unknown as UserEntity;

    return users;
  }

  updateUser = async (user: UserEntity): Promise<UserEntity | undefined> => {
    const updatedUser = await UserDb.update(user, {
      where: { id: user.id },
    }) as unknown as UserEntity;

    return updatedUser;
  }

  deleteUser = async (id: number): Promise<boolean>  => {
    const rowDeleted = await UserDb.destroy({
        where: { id },
      });

    return rowDeleted === 1;
  }
}

export const userRepository = new UserRepository();
