import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils';
import { StatusCode, messages } from '../constants';
import { JWT_SECRET, SALT } from '../public.env';
import { User } from '../resources/user/user.models';

const registerCallBack = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { email, login, password, role } = req.body;

  if (!((email || login) && password)) {
    res.status(StatusCode.BAD_REQUEST).json({ message: messages.enterData });
  }

  const foundEmail = email && await User.findOne({ email });
  if (foundEmail) {
    return res.status(StatusCode.CONFLICT).json({ message: messages.emailAlreadyExists });
  }
  const foundLogin = login && await User.findOne({ login });
  if (foundLogin) {
    return res.status(StatusCode.CONFLICT).json({ message: messages.loginAlreadyExists });
  }

  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = await User.create({
    login,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
  });

  res.status(StatusCode.CREATED).json({
    message: messages.userCreated,
    user: newUser,
  });
}

const loginCallBack = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { login, email, password } = req.body;

  if (!((login || email) && password)) {
    res.status(StatusCode.BAD_REQUEST).json({ message: messages.enterData });
  }

  let foundUser = await User.findOne({ login });

  if (!foundUser) {
    foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(StatusCode.BAD_REQUEST).json({ message: messages.userIsNotFound });
    }
  }

  const isMatchPassword = await bcrypt.compare(password, foundUser.password);

  if (!isMatchPassword) {
    return res.status(StatusCode.BAD_REQUEST).json({ message: messages.incorrectPassword });
  }

  const token = jwt.sign(
    { userId: foundUser._id, login, email, role: foundUser.role },
    JWT_SECRET,
    { expiresIn: '2h' },
  );

  res.json({ token, user: foundUser });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => errorHandler(
  req,
  res,
  StatusCode.INTERNAL_SERVER_ERROR,
  messages.somethingWentWrong,
  registerCallBack,
  next,
);

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => errorHandler(
  req,
  res,
  StatusCode.INTERNAL_SERVER_ERROR,
  messages.somethingWentWrong,
  loginCallBack,
  next,
);
