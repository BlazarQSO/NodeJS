import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../constants';

export const errorHandler = async (
  req: Request,
  res: Response,
  statusCode: StatusCode,
  message: string,
  callback: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response | undefined | void>,
  next: NextFunction,
) => {
  try {
    callback(req, res, next);
  } catch (error) {
    res.status(statusCode).json({ message });
  }
}
