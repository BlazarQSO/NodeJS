import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../Products/Product/Product';
import { useGetData, useHttp } from '../../hooks';
import { ProductEntity } from '../../interfaces';
import { BASE_URL, HttpMethods } from '../../constants';
import './ProductPage.scss';

export const ProductPage: FC = (): JSX.Element => {
  const { productId } = useParams();
  const { loading, request } = useHttp(true);
  const [product] = useGetData<ProductEntity>({
    request,
    url: `${BASE_URL}/products/${productId}`,
    method: HttpMethods.GET,
  });

  return (
    <div className="product-page">
      {
        loading
          ? <div>Loading...</div>
          : <Product title={product.title} description={product.description} price={product.price} id={productId} />
      }
    </div>
  );
};
