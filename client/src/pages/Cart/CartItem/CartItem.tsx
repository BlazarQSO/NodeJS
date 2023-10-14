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
}

export const CartItem: FC<CartItemProps> = ({
  product,
  count,
}: CartItemProps): JSX.Element => {
  const [cartCount, setCartCount] = useState(count);
  const { request } = useHttp(false);
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME));
  const userId = storage?.userId;

  const onDeleteProduct = () => {
    request(
      `${BASE_URL}/user/cart`,
      HttpMethods.PUT,
      {
        userId,
        productId: product.id,
        action: ActionUpdateCart.DELETE_ITEM,
      },
    );
  };

  const onDecreaseCount = () => {
    if (cartCount > 0) {
      setCartCount(cartCount - 1);
      request(
        `${BASE_URL}/user/cart`,
        HttpMethods.PUT,
        {
          userId,
          productId: product.id,
          count: cartCount - 1,
          action: ActionUpdateCart.UPDATE_ITEM,
        },
      );
    }
  };

  const onIncreaseCount = () => {
    setCartCount(cartCount + 1);
    request(
      `${BASE_URL}/user/cart`,
      HttpMethods.PUT,
      {
        userId,
        productId: product.id,
        count: cartCount + 1,
        action: ActionUpdateCart.UPDATE_ITEM,
      },
    );
  };

  return (
    <div className="cart-item">
      <div className="cart-item__title">{product.title}</div>
      <div className="cart-item__control">
        <div className="cart-item__price">{product.price}</div>
        <div className="cart-item__change-count">
          <Button onClick={onDecreaseCount} Icon={MinusIcon} />
          <div className="cart-item__count">
            {cartCount}
          </div>
          <Button onClick={onIncreaseCount} Icon={PlusIcon} />
          <Button onClick={onDeleteProduct} Icon={BucketIcon} />
        </div>
      </div>
    </div>
  );
};
