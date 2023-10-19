import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils';
import { HttpMethods, Separators, StatusCode, messages } from '../constants';
import { CustomRequest } from '../types/declaration';
import { UUID } from 'crypto';
import 'dotenv/config';
import { JWT_SECRET } from '../public.env';

const authorizationCallBack = async (
  req: CustomRequest,
  res: Response,
  next?: NextFunction,
): Promise<Response | undefined | void> => {
  if (req.method === HttpMethods.OPTIONS) {
    return next?.();
  }

  // authorization = `Bearer ${token}`
  const token = (req.headers.Authorization as string)?.split(Separators.SPACE)[1];

  if (!token) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: messages.notAuthorized });
  }

  const decodedToken = jwt.verify(token, JWT_SECRET);
  req.userAuth = decodedToken as UUID;
  next?.();
}

export const auth = async (
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
