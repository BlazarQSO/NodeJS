import Joi from 'joi';

export const loginValidation = {
  body: {
    login: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5).max(128),
  },
}

export const registerValidation = {
  body: {
    login: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5).max(128),
  },
}
