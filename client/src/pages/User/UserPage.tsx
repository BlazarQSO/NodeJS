import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { UserEntity } from '../../interfaces';
import { Button } from '../../components/Button/Button';
import { useForm, useGetData, useHttp } from '../../hooks';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import { InputValues } from '../../components/InputText/InputText.types';
import CloseIcon from '../../assets/icons/Close.svg';
import { BASE_URL, HttpMethods } from '../../constants';
import './UserPage.scss';
import { Loading } from '../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/context';
import { STORAGE_NAME } from '../../constants/storage';

export const UserPage: FC = (): JSX.Element => {
  const history = useHistory();
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME));
  const userId = storage?.userId;
  const { loading, request } = useHttp(true);
  const [user, onDependenciesUpdate] = useGetData<UserEntity>({
    request,
    url: `${BASE_URL}/user/${userId}`,
    method: HttpMethods.GET,
  });

  const [form, changeHandler, setForm] = useForm(null);
  const [isOpenModalUpdateUser, setIsOpenModalUpdateUser] = useState(false);
  const [isOpenModalDeleteUser, setIsOpenModalDeleteUser] = useState(false);

  useEffect(() => {
    user && setForm({ login: user.login, email: user.email, password: user.password });
  }, [user]);

  const onOpenModalDeleteUser = () => {
    setIsOpenModalDeleteUser(true);
  };

  const onCloseModalDeleteUser = () => {
    setIsOpenModalDeleteUser(false);
  };

  const onOpenModalUpdateUser = () => {
    setIsOpenModalUpdateUser(true);
  };

  const onCloseModalUpdateUser = () => {
    setIsOpenModalUpdateUser(false);
  };

  const onUpdateUser = () => {
    request(
      `${BASE_URL}/user`,
      HttpMethods.PUT,
      { ...form, id: userId },
      {},
      false,
    );
    onDependenciesUpdate();
    onCloseModalUpdateUser();
  };

  const onDeleteUser = () => {
    request(
      `${BASE_URL}/user`,
      HttpMethods.DELETE,
      { id: userId },
    );
    onDependenciesUpdate();
    onCloseModalDeleteUser();
    history.push('/products');
  };

  const inputsValuesCreateProduct: InputValues[] = useMemo(() => [
    {
      label: 'Login',
      value: form?.login,
    },
    {
      label: 'Email',
      value: form?.email,
    },
    {
      label: 'Password',
      value: form?.password,
    },
  ], [form]);

  return (
    <div className="user-page">
      <Loading loading={loading}>
        <div className="user-page__content">
          <div className="user-page__description">
            Login:
            {user?.login}
          </div>
          <div className="user-page__description">
            Email:
            {user?.email}
          </div>
          <div className="user-page__control">
            <Button title="Delete User" onClick={onOpenModalDeleteUser} />
            <Button title="Update User" onClick={onOpenModalUpdateUser} />
          </div>
        </div>
      </Loading>
      <ModalWindow
        isOpenWindow={isOpenModalUpdateUser}
        modalTitle="Update User"
        CloseIcon={CloseIcon}
        inputsValues={inputsValuesCreateProduct}
        onClose={onCloseModalUpdateUser}
        onOk={onUpdateUser}
        onChange={changeHandler}
      />
      <ModalWindow
        isOpenWindow={isOpenModalDeleteUser}
        modalTitle="Delete User"
        CloseIcon={CloseIcon}
        inputsValues={inputsValuesCreateProduct}
        onClose={onCloseModalDeleteUser}
        onOk={onDeleteUser}
        onChange={changeHandler}
        disabled
      />
    </div>
  );
};
