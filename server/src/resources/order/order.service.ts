import { orderRepository } from './order.repository';
import { IOrder, OrderEntity } from './order.interfaces';
import { Types } from 'mongoose';

export const getOrders = (): Promise<OrderEntity[]> => orderRepository.getOrders();

export const getOrder = (id: Types.ObjectId): Promise<OrderEntity | null> => orderRepository.getOrder(id);

export const getUserOrders = (
  userId: Types.ObjectId,
): Promise<OrderEntity[] | null> => orderRepository.getUserOrders(userId);

export const createOrder = (order: IOrder): Promise<OrderEntity> => orderRepository.createOrder(order);

export const updateOrder = (
  order: OrderEntity,
): Promise<OrderEntity | null> => orderRepository.updateOrder(order);

export const deleteOrder = (id: Types.ObjectId): Promise<OrderEntity | null> => orderRepository.deleteOrder(id);
