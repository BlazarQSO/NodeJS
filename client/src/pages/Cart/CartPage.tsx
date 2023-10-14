import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { data } from '../Products/ProductsPage';
import { Button } from '../../components/Button/Button';
import { CartItem } from './CartItem/CartItem';
import { RadioButtons } from '../../components/RadioButtons/RadioButtons';
import { ActionUpdateCart, CartEntity, DeliveryType, OrderStatus, PaymentType } from '../../interfaces';
import { InputText } from '../../components/InputText/InputText';
import './CartPage.scss';
import { useForm, useGetData, useHttp } from '../../hooks';
import { BASE_URL, HttpMethods } from '../../constants';
import { Loading } from '../../components/Loading/Loading';
import { STORAGE_NAME } from '../../constants/storage';

export const CartPage: FC = (): JSX.Element => {
  const history = useHistory();
  const { loading, request } = useHttp(true);
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME));
  const userId = storage?.userId;

  const [cart] = useGetData<CartEntity>({
    request,
    url: `${BASE_URL}/user/cart`,
    method: HttpMethods.POST,
    body: { userId },
  });

  const [isCreateNewOrder, setIsCreateNewOrder] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const deliveryButtons = Object.values(DeliveryType);
  const paymentButtons = Object.values(PaymentType);
  const [form, changeHandler] = useForm({
    checkedDelivery: deliveryButtons[0] as string,
    checkedPayment: paymentButtons[0] as string,
    address: '',
    comment: '',
  });

  const onArchiveOrders = () => {
    history.push('/user/orders');
  };

  const goToProducts = () => {
    history.push('/products');
  };

  const total = useMemo(() => cart?.items?.reduce((sum, item) => sum + item.count * item.product.price, 0), [cart]);

  const onShowOrder = () => {
    setShowOrder(true);
  };

  const onCancelOrder = () => {
    setShowOrder(false);
  };

  const onCreateOrder = async () => {
    const newOrder = await request(`${BASE_URL}/user/orders`, HttpMethods.POST, {
      total,
      status: OrderStatus.CREATED,
      paymentType: form.checkedPayment,
      comments: form.comment,
      delivery: {
        deliveryType: form.checkedDelivery,
        address: form.address,
      },
      date: new Date().getTime(),
      userId,
    });

    if (newOrder) {
      setIsCreateNewOrder(true);
      request(`${BASE_URL}/user/cart`, HttpMethods.PUT, { userId, action: ActionUpdateCart.RESET_CART });
    }
  };

  const onClearCart = () => {
    request(`${BASE_URL}/user/cart`, HttpMethods.PUT, { userId, action: ActionUpdateCart.RESET_CART });
  };

  return (
    <div className="cart-page">
      <Loading loading={loading}>
        <>
          {
            isCreateNewOrder
              ? (
                <div className="cart-page__order-created-wrapper">
                  <div className="cart-page__order-created">Order Created</div>
                  <Button onClick={goToProducts} title="Make a new purchase" />
                </div>
              )
              : (
                <>
                  <div className="cart-page__header">
                    <div>Cart</div>
                    <Button title="Archive orders" onClick={onArchiveOrders} />
                  </div>
                  <div className="cart-page__products">
                    {
                      cart?.items?.length > 0
                        ? cart.items.map(({ product, count }) => (
                          <CartItem product={product} count={count} key={product.id} />
                        ))
                        : <div className="cart-page__cart-empty">Cart is Empty</div>
                    }
                  </div>
                  <div className="cart-page__make-order">
                    <div className="cart-page__order-control">
                      {!showOrder && <Button title="Make an order" onClick={onShowOrder} />}
                      {!showOrder && <Button title="Clear the cart" onClick={onClearCart} />}
                    </div>
                    <div className="cart-page__total">
                      Total:
                      {total}
                    </div>
                  </div>
                  {
                    showOrder && (
                      <div className="cart-page__order">
                        <RadioButtons
                          title="Choose delivery:"
                          radioButtons={deliveryButtons}
                          onChange={changeHandler}
                          checkedValue={form.checkedDelivery}
                          name="checkedDelivery"
                        />
                        <RadioButtons
                          title="Choose payment:"
                          radioButtons={paymentButtons}
                          onChange={changeHandler}
                          checkedValue={form.checkedPayment}
                          name="checkedPayment"
                        />
                        <InputText
                          onChange={changeHandler}
                          formValue={form.address}
                          label="Write the delivery address"
                          placeholder="Address"
                          name="address"
                        />
                        <div>
                          <div className="cart-page__comment">Comment: </div>
                          <textarea
                            className="cart-page__textarea"
                            onChange={changeHandler}
                            value={form.comment}
                            name="comment"
                          />
                        </div>
                        <div className="cart-page__control">
                          <Button title="Cancel the order" onClick={onCancelOrder} />
                          <Button title="Place an order" onClick={onCreateOrder} />
                        </div>
                      </div>
                    )
                  }
                </>
              )
          }
        </>
      </Loading>
    </div>
  );
};
