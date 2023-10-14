import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BucketIcon from '../../assets/icons/Bucket.svg';
import EditIcon from '../../assets/icons/EditIcon.svg';
import { Button } from '../../components/Button/Button';
import { BASE_URL, HttpMethods } from '../../constants';
import { useGetData, useHttp } from '../../hooks';
import { OrderEntity, OrderStatus, UUID } from '../../interfaces';
import { Loading } from '../../components/Loading/Loading';
import { STORAGE_NAME } from '../../constants/storage';
import './OrdersPage.scss';
import { Context } from '../../context/context';

export const OrdersPage: FC = (): JSX.Element => {
  const history = useHistory();
  const storage = JSON.parse(localStorage.getItem(STORAGE_NAME));
  const userId = storage?.userId;
  const { loading, request } = useHttp(true);
  // fake admin role
  const isAdminRole = history.location.pathname.endsWith('/all');
  const [orders, onDependenciesUpdate] = useGetData<OrderEntity[]>({
    request,
    // user/orders/all admin role
    url: isAdminRole ? `${BASE_URL}/user/orders/all` : `${BASE_URL}/user/orders`,
    method: isAdminRole ? HttpMethods.GET : HttpMethods.POST,
    body: isAdminRole ? null : { userId },
  });

  const onDeleteOrder = async (id: UUID) => {
    await request(`${BASE_URL}/user/orders`, HttpMethods.DELETE, { id }, {}, false);
    onDependenciesUpdate();
  };

  const onUpdateOrder = async (order: OrderEntity) => {
    const status = order.status === OrderStatus.CREATED
      ? OrderStatus.COMPLETED
      : OrderStatus.CREATED;

    await request(`${BASE_URL}/user/orders`, HttpMethods.PUT, { ...order, status }, {}, false);
    onDependenciesUpdate();
  };

  const backToCart = () => {
    history.push('/user/cart');
  };

  const backToProducts = () => {
    history.push('/products');
  };

  const getAllOrders = () => {
    history.push('orders/all');
  };

  return (
    <div className="orders-page">
      <Loading loading={loading}>
        <div className="orders-page__header">
          Orders
        </div>
        <div className="orders-page__content">
          <div className="orders-page__describe">
            <div className="orders-page__title">Date:</div>
            <div className="orders-page__title">Total:</div>
          </div>
          {
            orders?.map((order) => (
              <div
                key={order.id}
                className={`orders-page__order ${
                  order.status === OrderStatus.COMPLETED ? 'orders-page__order_completed' : ''
                }`}
              >
                <div className="cart-item__title">
                  Order N:
                  {order.id}
                </div>
                <div className="cart-item__control">
                  <div>{new Date(order.date).toLocaleDateString()}</div>
                  <div>{order.total}</div>
                  {
                    isAdminRole && (
                      <div title="Update status: Create or Complete">
                        <Button onClick={() => onUpdateOrder(order)} Icon={EditIcon} />
                      </div>
                    )
                  }
                  <Button onClick={() => onDeleteOrder(order.id)} Icon={BucketIcon} />
                </div>
              </div>
            ))
          }
        </div>
        <div className="orders-page__footer">
          <Button title="Back to cart" onClick={backToCart} />
          <Button title="Back to products" onClick={backToProducts} />
          <Button title="Get all orders (admin)" onClick={getAllOrders} />
        </div>
      </Loading>
    </div>
  );
};
