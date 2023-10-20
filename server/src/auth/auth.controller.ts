import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils';
import { StatusCode, messages } from '../constants';
import { JWT_SECRET, SALT } from '../public.env';
import { CartDb, UserDb } from '../database/models.db';
import { cartRepository } from '../resources/cart/cart.repository';
import { UserEntity } from '../resources/user/user.interfaces';
import { CartEntity } from '../resources/cart/cart.interfaces';
import 'dotenv/config';

const registerCallBack = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { email, login, password } = req.body;

  const newUserByEmail = await UserDb.findOne({
    where: { email },
  }) as unknown as UserEntity;
  if (newUserByEmail) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.emailAlreadyExists });
  }

  const newUserByLogin = await UserDb.findOne({
    where: { login },
  }) as unknown as UserEntity;
  if (newUserByLogin) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.loginAlreadyExists });
  }

  const hashedPassword = await bcrypt.hash(password, SALT);
  const newUser = await UserDb.create({ login, email, password: hashedPassword }) as unknown as UserEntity;
  const newCart = await cartRepository.createCart({ userId: newUser.id });

  res.status(StatusCode.CREATED).json({
    message: messages.userCreated,
    user: newUser,
    cartId: newCart.id,
  });
}

const loginCallBack = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { login, email, password } = req.body;

  let foundUser = await UserDb.findOne({
    where: { login },
  }) as unknown as UserEntity;
  if (!foundUser) {
    foundUser = await UserDb.findOne({
      where: { email },
    }) as unknown as UserEntity;
    if (!foundUser) {
      return res.status(StatusCode.BAD_REQUEST).json({ message: messages.userIsNotFound });
    }
  }

  const isMatchPassword = await bcrypt.compare(password, foundUser.password);

  if (!isMatchPassword) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.incorrectPassword });
  }

  const token = jwt.sign(
    { userId: foundUser.id },
    JWT_SECRET,
    { expiresIn: '1h' },
  );

  const cart = await CartDb.findOne({
    where: { userId: foundUser.id },
  }) as unknown as CartEntity;

  res.json({ token, user: foundUser, cartId: cart?.id });
};

export const register = async (
  req: Request,
  res: Response,
): Promise<void> => errorHandler(
  req,
  res,
  StatusCode.INTERNAL_SERVER_ERROR,
  messages.somethingWentWrong,
  registerCallBack,
);

export const login = async (
  req: Request,
  res: Response,
): Promise<void> => errorHandler(
  req,
  res,
  StatusCode.INTERNAL_SERVER_ERROR,
  messages.somethingWentWrong,
  loginCallBack,
);
