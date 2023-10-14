import { UUID } from 'crypto';
import { orderDb } from '../../database';
import { Order } from './order.model';

export const getOrders = async (): Promise<Order[]> => {
  const orders = await orderDb.getOrders();
  return orders;
};

export const getOrder = async (id: UUID, userId: UUID): Promise<Order | undefined> => {
  const order = await orderDb.getOrder(id, userId);
  return order;
};

export const getUserOrders = async (userId: UUID): Promise<Order[]> => {
  const orders = await orderDb.getUserOrders(userId);
  return orders;
};

export const createOrder = async (order: Order): Promise<Order> => {
  const orders = await orderDb.createOrder(order);
  return orders;
};

export const updateOrder = async (order: Order): Promise<Order | undefined> => {
  const updatedOrder = await orderDb.updateOrder(order);
  return updatedOrder;
}

export const deleteOrder = async (id: UUID): Promise<void> => {
  await orderDb.deleteOrder(id);
};
