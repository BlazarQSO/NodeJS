import React, { FC, useEffect, useMemo, useState } from 'react';
import './ProductsPage.scss';
import { Product } from './Product/Product';
import { Button } from '../../components/Button/Button';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';
import CloseIcon from '../../assets/icons/Close.svg';
import { useForm, useGetData, useHttp } from '../../hooks';
import { InputValues } from '../../components/InputText/InputText.types';
import { ProductEntity, UUID } from '../../interfaces';
import { BASE_URL, HttpMethods } from '../../constants';

export const data: ProductEntity[] = [
  {
    id: '1' as UUID,
    title: 'title1',
    description: 'description1',
    price: 100,
  },
  {
    id: '2' as UUID,
    title: 'title2',
    description: 'description2',
    price: 200,
  },
  {
    id: '3' as UUID,
    title: 'title3',
    description: 'description3',
    price: 300,
  },
  {
    id: '4' as UUID,
    title: 'title4',
    description: 'description4',
    price: 400,
  },
  {
    id: '5' as UUID,
    title: 'title5',
    description: 'description5',
    price: 500,
  },
];

export const ProductsPage: FC = (): JSX.Element => {
  const [form, changeHandler] = useForm({ title: '', description: '', price: null });
  const { loading, request, error } = useHttp(true);
  const [products] = useGetData<ProductEntity[]>({
    request,
    url: `${BASE_URL}/products`,
    method: HttpMethods.GET,
    defaultValue: [],
  });
  const [isOpenCreateProduct, setIsOpenCreateProduct] = useState(false);
  const onClose = (): void => {
    setIsOpenCreateProduct(false);
  };

  const onOpenCreateProduct = (): void => {
    setIsOpenCreateProduct(true);
  };

  const onCreateProduct = () => {
    request(`${BASE_URL}/products`, HttpMethods.POST, form);
    onClose();
  };

  const inputsValuesCreateProduct: InputValues[] = useMemo(() => [
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

  return (
    <>
      {loading
        ? <div>Loading...</div>
        : (
          <div className="products-page">
            <div className="products-page__header">
              <div className="products-page__title">Products</div>
              <Button onClick={onOpenCreateProduct} title="Create product" />
            </div>
            <div className="products-page__content">
              {products.map(({ title, description, price, id }) => (
                <Product
                  key={id}
                  title={title}
                  description={description}
                  price={price}
                  id={id}
                />
              ))}
            </div>
            <ModalWindow
              isOpenWindow={isOpenCreateProduct}
              modalTitle="Create Product"
              CloseIcon={CloseIcon}
              inputsValues={inputsValuesCreateProduct}
              onClose={onClose}
              onOk={onCreateProduct}
              onChange={changeHandler}
            />
          </div>
        )}
    </>
  );
};
