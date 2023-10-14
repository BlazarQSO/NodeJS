import * as orderRepository from './order.repository';
import { Order } from './order.model';
import { UUID } from 'crypto';

export const getOrders = (): Promise<Order[]> => orderRepository.getOrders();

export const getOrder = (id: UUID, userId: UUID): Promise<Order | undefined> => orderRepository.getOrder(id, userId);

export const getUserOrders = (userId: UUID): Promise<Order[]> => orderRepository.getUserOrders(userId);

export const createOrder = (order: Order): Promise<Order> => orderRepository.createOrder(new Order(order));

export const updateOrder = (order: Order): Promise<Order | undefined> => orderRepository.updateOrder(order);

export const deleteOrder = (id: UUID): Promise<void> => orderRepository.deleteOrder(id);
