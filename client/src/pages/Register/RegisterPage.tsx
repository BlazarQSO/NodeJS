import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { FormLayout } from '../../layouts/FormLayout/FormLayout';
import { InputText } from '../../components/InputText/InputText';
import { useForm, useHttp } from '../../hooks';
import { BASE_URL, HttpMethods } from '../../constants';
import { Context } from '../../context/context';

const Register: FC = (): JSX.Element => {
  const history = useHistory();
  const { login } = useContext(Context);
  const [form, changeHandler] = useForm({ login: '', email: '', password: '' });
  const { request } = useHttp(false);

  const onRegister = async (): Promise<void> => {
    const response = await request(`${BASE_URL}/auth/register`, HttpMethods.POST, form);
    // add to context
    login(response.token, response.user.id, response.user.login);
    history.push('/products');
  };

  return (
    <FormLayout title="Register" onOk={onRegister} titleClick="Register" isContent>
      <InputText label="Login" placeholder="Login" onChange={changeHandler} formValue={form.login} />
      <InputText label="Email" placeholder="Email" onChange={changeHandler} formValue={form.email} />
      <InputText label="Password" placeholder="Password" onChange={changeHandler} formValue={form.password} />
    </FormLayout>
  );
};

export const RegisterPage = withRouter(Register);
