import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes/routes';
import { Header } from './layouts/Header/Header';
import { Footer } from './layouts/Footer/Footer';
import { useAuth, useProductCount } from './hooks';
import { Context } from './context/context';
import './App.scss';

export const App: React.FC = () => {
  const { login, logout, token, userId, userLogin, ready } = useAuth();
  const [productCount, productCountHandler] = useProductCount(userId);
  const isAuthenticated = !!token;
  const routes = useRoutes();

  return (
    <Context.Provider value={{
      login,
      logout,
      token,
      userId,
      isAuthenticated,
      userLogin,
      ready,
      cart: null,
      user: null,
      productCount,
      productCountHandler,
    }}
    >
      <BrowserRouter>
        <div className="app">
          <Header />
          {routes}
          <Footer />
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
};
