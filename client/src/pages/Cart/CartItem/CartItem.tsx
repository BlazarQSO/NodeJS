import React, { FC, useContext, useState } from 'react';
import { ActionUpdateCart, ProductEntity } from '../../../interfaces';
import { Button } from '../../../components/Button/Button';
import BucketIcon from '../../../assets/icons/Bucket.svg';
import MinusIcon from '../../../assets/icons/Minus.svg';
import PlusIcon from '../../../assets/icons/Plus.svg';
import { useHttp } from '../../../hooks';
import { BASE_URL, HttpMethods } from '../../../constants';
import { STORAGE_NAME } from '../../../constants/storage';
import './CartItem.scss';
import { Context } from '../../../context/context';

interface CartItemProps {
  product: ProductEntity;
  count: number;
  onDependenciesUpdate: () => void;
}

export const CartItem: FC<CartItemProps> = ({
  product,
  count,
  onDependenciesUpdate,
}: CartItemProps): JSX.Element => {
  const { loading, request } = useHttp(false);
  const { productCountHandler, userId } = useContext(Context);

  const onDeleteProduct = async () => {
    await request(
      `${BASE_URL}/user/cart`,
      HttpMethods.PUT,
      {
        userId,
        productId: product.id,
        action: ActionUpdateCart.DELETE_ITEM,
      },
    );
    productCountHandler();
    onDependenciesUpdate();
  };

  const onDecreaseCount = async () => {
    if (count > 0) {
      await request(
        `${BASE_URL}/user/cart`,
        HttpMethods.PUT,
        {
          userId,
          productId: product.id,
          count: count - 1,
          action: ActionUpdateCart.UPDATE_ITEM,
        },
      );
      productCountHandler();
      onDependenciesUpdate();
    }
  };

  const onIncreaseCount = async () => {
    await request(
      `${BASE_URL}/user/cart`,
      HttpMethods.PUT,
      {
        userId,
        productId: product.id,
        count: count + 1,
        action: ActionUpdateCart.UPDATE_ITEM,
      },
    );
    productCountHandler();
    onDependenciesUpdate();
  };

  return (
    <div className="cart-item">
      <div className="cart-item__title">{product.title}</div>
      <div className="cart-item__control">
        <div className="cart-item__price">{product.price}</div>
        <div className="cart-item__change-count">
          <Button onClick={onDecreaseCount} Icon={MinusIcon} disabled={loading} />
          <div className="cart-item__count">
            {count}
          </div>
          <Button onClick={onIncreaseCount} Icon={PlusIcon} disabled={loading} />
          <Button onClick={onDeleteProduct} Icon={BucketIcon} />
        </div>
      </div>
    </div>
  );
};
