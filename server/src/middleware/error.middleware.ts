import { Request, Response } from 'express';
import { StatusCode } from '../constants';

class ApiError extends Error {
  status: StatusCode
  message: string

  constructor(status: StatusCode, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message: string) {
    return new ApiError(StatusCode.BAD_REQUEST, message);
  }

  static internal(message: string) {
    return new ApiError(StatusCode.INTERNAL_SERVER_ERROR, message);
  }

  static forbidden(message: string) {
    return new ApiError(StatusCode.FORBIDDEN, message);
  }
}

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  if (err  instanceof ApiError) {
    return res.status(err.status).json({ message: err.message});
  }
  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong'});
}
