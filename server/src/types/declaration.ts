import { UUID } from 'crypto';
import { Request } from 'express';

export interface CustomRequest extends Request {
  userAuth?: UUID;
}
