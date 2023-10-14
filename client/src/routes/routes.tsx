import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { UserPage } from '../pages/User/UserPage';
import { ProductsPage } from '../pages/Products/ProductsPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { RegisterPage } from '../pages/Register/RegisterPage';
import { CartPage } from '../pages/Cart/CartPage';
import { OrdersPage } from '../pages/OrdersPage/OrdersPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';

export const useRoutes = (): JSX.Element => (
  <Switch>
    <Route path="/" exact component={ProductsPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/register" exact component={RegisterPage} />
    <Route path="/products" exact component={ProductsPage} />
    <Route path="/products/:productId" exact component={ProductPage} />
    {/* <Route path="/user" exact component={UserPage} /> */}
    <Route path="/user/cart" exact component={CartPage} />
    <Route path="/user/orders" exact component={OrdersPage} />
    {/* user/orders/all admin role */}
    <Route path="/user/orders/all" exact component={OrdersPage} />
    <Route path="/user" exact component={UserPage} />
    <Redirect to="/" component={ProductsPage} />
  </Switch>
);
