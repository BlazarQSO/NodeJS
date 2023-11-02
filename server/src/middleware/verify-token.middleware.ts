import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils';
import { HttpMethods, Separators, StatusCode, messages } from '../constants';
import { JWT_SECRET } from '../public.env';
import { UserEntity } from '../resources/user/user.interfaces';

const authorizationCallBack = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined | void> => {
  if (req.method === HttpMethods.OPTIONS) {
    return next();
  }

  const auth = req.headers.authorization as string;

  if (!auth) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: messages.notAuthorized });
  }

  // authorization = `Bearer ${token}`
  const [tokenType, token] = auth.split(Separators.SPACE);

  if (tokenType !== 'Bearer') {
    return res.status(StatusCode.FORBIDDEN).json({ message: messages.invalidToken });
  }

  const user = jwt.verify(token, JWT_SECRET) as UserEntity;
  req.user = user;

  return next();
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => errorHandler(
  req,
  res,
  StatusCode.INTERNAL_SERVER_ERROR,
  messages.somethingWentWrong,
  authorizationCallBack,
  next,
);
