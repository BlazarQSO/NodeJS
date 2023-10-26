import { IOrder, OrderEntity } from './order.interfaces';
import { Order } from './order.models'

class OrderRepository {
  getOrders = async (): Promise<OrderEntity[]> => {
    const orders = await Order.find();

    return orders;
  }

  getOrder = async (id: string): Promise<OrderEntity | null> => {
    const order = await Order.findById({ id });

    return order;
  }

  getUserOrders = async (userId: string): Promise<OrderEntity[] | null> => {
    const orders = await Order.find({ userId });

    return orders;
  }

  createOrder = async (order: IOrder): Promise<OrderEntity> => {
    const newOrder = new Order(order);
    await newOrder.save();

    return newOrder;
  }

  updateOrder = async (orderEntity: OrderEntity): Promise<OrderEntity | null> => {
    const { _id, ...order } = orderEntity;
    const updatedOrder = await Order.findByIdAndUpdate(_id, order);

    return updatedOrder;
  }

  deleteOrder = async (id: string): Promise<OrderEntity | null> => {
    const deletedOrder = await Order.findByIdAndDelete({ id });

    return deletedOrder;
  }
}

export const orderRepository = new OrderRepository();
