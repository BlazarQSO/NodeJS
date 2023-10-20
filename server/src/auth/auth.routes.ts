import { Router } from 'express';
import { validate } from 'express-validation';
import { login, register } from './auth.controller';
import { loginValidation, registerValidation } from '../validators/auth.validators';

const routerAuth = Router();

// /login
// routerAuth.post('/login', validate(loginValidation), login);
routerAuth.post('/login', login);

// /register
// routerAuth.post('/register', validate(registerValidation), register);
routerAuth.post('/register', register);

export { routerAuth };
