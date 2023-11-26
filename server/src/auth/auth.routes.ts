import { Router } from 'express';
import { register, login } from './auth.controller';

const routerAuth = Router();

routerAuth.post('/login', login);

routerAuth.post('/register', register);

export { routerAuth };
