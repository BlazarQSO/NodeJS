import React, { FC, useContext, useMemo, useState } from 'react';
import './Product.scss';
import { Button } from '../../../components/Button/Button';
import EmptyImage from '../../../assets/icons/EmptyImage.svg';
import { ModalWindow } from '../../../components/ModalWindow/ModalWindow';
import { InputValues } from '../../../components/InputText/InputText.types';
import CloseIcon from '../../../assets/icons/Close.svg';
import { useForm, useHttp } from '../../../hooks';
import { ActionUpdateCart, UUID } from '../../../interfaces';
import { BASE_URL, HttpMethods } from '../../../constants';
import { STORAGE_NAME } from '../../../constants/storage';
import { Context } from '../../../context/context';

interface ProductProps {
  title: string;
  description?: string;
  price: number;
  Image?: React.FC;
  id: UUID;
}

export const Product: FC<ProductProps> = ({
  Image,
  title,
  description = '',
  price,
  id,
}: ProductProps): JSX.Element => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [form, changeHandler] = useForm({ title, description, price });
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME));
  const userId = storage?.userId;
  const { request } = useHttp(false);

  const onCloseUpdate = (): void => {
    setIsOpenUpdate(false);
  };

  const onCloseDelete = (): void => {
    setIsOpenDelete(false);
  };

  const onUpdate = () => {
    setIsOpenUpdate(true);
  };

  const updateHandler = () => {
    request(`${BASE_URL}/products/${id}`, HttpMethods.PUT, form);
    setIsOpenUpdate(false);
  };

  const onDelete = () => {
    setIsOpenDelete(true);
    console.log('delete');
  };

  const deleteHandler = () => {
    request(`${BASE_URL}/products/${id}`, HttpMethods.DELETE);
    setIsOpenDelete(false);
  };

  const onAddToCart = () => {
    request(
      `${BASE_URL}/user/cart`,
      HttpMethods.PUT,
      {
        userId,
        productId: id,
        count: 1,
        action: ActionUpdateCart.ADD_ITEM,
      },
    );
  };

  const inputsValuesUpdateProduct: InputValues[] = useMemo(() => [
    {
      label: 'Title',
      value: form.title,
    },
    {
      label: 'Description',
      value: form.description,
    },
    {
      label: 'Price',
      value: String(form.price ? form.price : ''),
    },
  ], [form]);

  const inputsValuesDeleteProduct: InputValues[] = useMemo(() => [
    {
      label: 'Title',
      value: form.title,
      isDisabled: true,
    },
    {
      label: 'Description',
      value: form.description,
      isDisabled: true,
    },
    {
      label: 'Price',
      value: String(form.price ? form.price : ''),
      isDisabled: true,
    },
  ], [form]);

  return (
    <div className="product">
      <div className="product__content">
        {Image ? <Image /> : <EmptyImage /> }
        <div className="product__title">
          <span>{title}</span>
          <span>{description}</span>
        </div>
        <div className="product__price">
          <div>Price</div>
          <div>{price}</div>
        </div>
      </div>
      <div className="product__control">
        <div className="product__admin">
          <Button onClick={onDelete} title="Delete" />
          <Button onClick={onUpdate} title="Update" />
        </div>
        <Button onClick={onAddToCart} title="Add to Cart" />
      </div>
      <ModalWindow
        isOpenWindow={isOpenUpdate}
        modalTitle="Update Product"
        CloseIcon={CloseIcon}
        inputsValues={inputsValuesUpdateProduct}
        onClose={onCloseUpdate}
        onOk={updateHandler}
        onChange={changeHandler}
      />
      <ModalWindow
        isOpenWindow={isOpenDelete}
        modalTitle="Delete Product"
        CloseIcon={CloseIcon}
        inputsValues={inputsValuesDeleteProduct}
        onClose={onCloseDelete}
        onOk={deleteHandler}
        onChange={changeHandler}
      />
    </div>
  );
};
