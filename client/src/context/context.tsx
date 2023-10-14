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
  login: (jwtToken: string, id: UUID, userLogin: string) => {},
  logout: () => {},
  // setUser: (user: UserEntity) => {},
  // setCart: (cart: CartEntity) => {},
});

// const Context = createContext(null);

// interface AppContextProviderProps {
//   children: string | JSX.Element | JSX.Element[];
// }

// export const AppContextProvider: FC<AppContextProviderProps> = ({ children, ...props }) => {
//   const context = useCreateAppContext(props);

//   return <Context.Provider value={context}>{children}</Context.Provider>;
// };
