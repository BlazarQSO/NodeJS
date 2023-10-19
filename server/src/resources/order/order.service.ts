import { orderRepository } from './order.repository';
import { IOrder, OrderEntity } from './order.interfaces';

export const getOrders = (): Promise<OrderEntity[]> => orderRepository.getOrders();

export const getOrder = (id: number): Promise<OrderEntity | undefined> => orderRepository.getOrder(id);

export const getUserOrders = (userId: number): Promise<OrderEntity[]> => orderRepository.getUserOrders(userId);

export const createOrder = (order: IOrder): Promise<OrderEntity> => orderRepository.createOrder(order);

export const updateOrder = (
  order: OrderEntity,
): Promise<OrderEntity | undefined> => orderRepository.updateOrder(order);

export const deleteOrder = (id: number): Promise<boolean> => orderRepository.deleteOrder(id);
