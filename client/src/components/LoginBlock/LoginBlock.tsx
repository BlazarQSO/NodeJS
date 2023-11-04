import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CartIcon from '../../assets/icons/Cart.svg';
import { Button } from '../Button/Button';
import { Context } from '../../context/context';
import './LoginBlock.scss';

export const LoginBlock: FC = (): JSX.Element => {
  const history = useHistory();
  const { logout, isAuthenticated, userLogin, productCount } = useContext(Context);

  const goToRegister = () => {
    history.push('/register');
  };

  const goToLogin = () => {
    history.push('/login');
  };

  const goToCart = () => {
    history.push('/user/cart');
  };

  const goToUserPage = () => {
    history.push('/user');
  };

  const logoutHandler = () => {
    logout();
    history.push('/products');
  };

  return (
    <section className="login-block">
      {
        !isAuthenticated ? (
          <div className="cart">
            <Button onClick={goToRegister} className="logout-wrapper__user-name" title="register" />
            <Button onClick={goToLogin} className="logout-wrapper__logout" title="login" />
          </div>
        )
          : (
            <div className="cart">
              <div className="logout-wrapper">
                <Button onClick={goToUserPage} className="logout-wrapper__user-name" title={userLogin} />
                <Button onClick={logoutHandler} className="logout-wrapper__logout" title="logout" />
              </div>
              <div className="cart__icon">
                <Button onClick={goToCart} Icon={CartIcon} />
                <div className="cart__count">{productCount}</div>
              </div>
            </div>
          )
      }
    </section>
  );
};
