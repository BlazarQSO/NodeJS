import { Request, Response } from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils';
import { userDb } from '../database';
import { SALT, StatusCode, messages } from '../constants';
import { User } from '../resources/user/user.model';
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

  res.status(StatusCode.CREATED).json({ message: messages.userCreated });
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

  const isMatchPassword = await bcrypt.compare(password, foundUser.password);

  if (!isMatchPassword) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.incorrectPassword })
  }

  const token = jwt.sign(
    { userId: foundUser.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' },
  );

  res.json({ token, userId: foundUser.id });
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
