import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils';
import { cartDb, userDb } from '../database';
import { SALT, StatusCode, messages } from '../constants';
import { User } from '../resources/user/user.model';
import { createCart } from '../resources/cart/cart.service';
import 'dotenv/config';

const registerCallBack = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { email, login, password } = req.body;

  const newUserByEmail = await userDb.findUserByEmail(email);
  if (newUserByEmail) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.emailAlreadyExists });
  }
  const newUserByLogin = await userDb.findUserByLogin(login);
  if (newUserByLogin) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.loginAlreadyExists });
  }

  const hashedPassword = await bcrypt.hash(password, SALT);
  const newUser = new User({ login, email, password: hashedPassword });
  await userDb.createUser(newUser);
  const newCart = await createCart({ userId: newUser.id, items: [] });

  res.status(StatusCode.CREATED).json({
    message: messages.userCreated,
    user: newUser,
    cartId: newCart.id,
  });
}

const loginCallBack = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { login, email, password } = req.body;

  let foundUser = await userDb.findUserByEmail(email);
  if (!foundUser) {
    foundUser = await userDb.findUserByLogin(login);
    if (!foundUser) {
      return res.status(StatusCode.BAD_REQUEST).json({ message: messages.userIsNotFound });
    }
  }

  const isMatchPassword = await bcrypt.compare(password, foundUser.password)
    // for mock users
    || password.match(/password/);

  if (!isMatchPassword) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.incorrectPassword })
  }

  const token = jwt.sign(
    { userId: foundUser.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );

  const cart = cartDb.findCart(foundUser.id);
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
