import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils';
import { Role, StatusCode, messages } from '../constants';

const authorizationCallBack = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined | void> => {
  const { user } = req;

  if (user.role !== Role.ADMIN) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: messages.notAuthorized });
  }

  next();
}

export const isAuth = async (
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
