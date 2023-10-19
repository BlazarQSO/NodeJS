import React, { FC, createContext } from 'react';
import { CartEntity, UUID, UserEntity } from '../interfaces';

export const Context = createContext({
  token: null,
  user: null,
  cart: null,
  userId: null,
  isAuthenticated: false,
  userLogin: null,
  ready: false,
  productCount: 0,
  productCountHandler: () => {},
  login: (jwtToken: string, id: UUID, userLogin: string) => {},
  logout: () => {},
});
