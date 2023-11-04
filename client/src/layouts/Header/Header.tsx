import React, { FC } from 'react';
import { LoginBlock } from '../../components/LoginBlock/LoginBlock';
import './Header.scss';

export const Header: FC = (): JSX.Element => (
  <header className="header">
    <h2 className="header__title">Shop</h2>
    <LoginBlock />
  </header>
);
