import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { FormLayout } from '../../layouts/FormLayout/FormLayout';
import { InputText } from '../../components/InputText/InputText';
import { useForm, useHttp } from '../../hooks';
import { BASE_URL, HttpMethods } from '../../constants';
import { Context } from '../../context/context';
// import 'dotenv/config';

export const Login: FC = (): JSX.Element => {
  const { login } = useContext(Context);
  const history = useHistory();
  const [form, changeHandler] = useForm({ login: '', email: '', password: '' });
  const { request } = useHttp(false);

  const onLogin = async (): Promise<void> => {
    const response = await request(`${BASE_URL}/auth/login`, HttpMethods.POST, form);
    // add to context

    login(response.token, response.user.id, response.user.login);
    history.push('/products');
  };

  const onRegister = () => {
    history.push('/register');
  };

  return (
    <FormLayout
      title="Login"
      titleClick="Login"
      titleAdditional="Register"
      onOk={onLogin}
      onAdditional={onRegister}
      isContent
    >
      <InputText label="Login" placeholder="Login" onChange={changeHandler} formValue={form.login} />
      <InputText label="Email" placeholder="Email" onChange={changeHandler} formValue={form.email} />
      <InputText label="Password" placeholder="Password" onChange={changeHandler} formValue={form.password} />
    </FormLayout>
  );
};

export const LoginPage = withRouter(Login);
