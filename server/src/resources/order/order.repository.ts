import { OrderDb } from '../../database/models.db';
import { defaultOrderDb } from '../../constants';
import { IOrder, OrderEntity } from './order.interfaces';

class OrderRepository {
  constructor() {
    const addDefaultUsers = async () => {
      setTimeout(() => {
        Promise.all(defaultOrderDb.map(async (order) => {
          const found = await OrderDb.findOne({
            where: {
              id: order.id,
            },
          });
          !found && await OrderDb.create({ ...order });
        }));
      }, 20000);
    }

    addDefaultUsers();
  }

  getOrders = async (): Promise<OrderEntity[]> => {
    const orders = await OrderDb.findAll() as unknown as OrderEntity[];

    return orders;
  }

  getOrder = async (id: number): Promise<OrderEntity | undefined> => {
    const order = await OrderDb.findOne({
      where: { id },
    }) as unknown as OrderEntity;

    return order;
  }

  getUserOrders = async (userId: number): Promise<OrderEntity[]> => {
    const orders = await OrderDb.findAll({
      where: { userId }
    }) as unknown as OrderEntity[];

    return orders;
  }

  createOrder = async (order: IOrder): Promise<OrderEntity> => {
    const orders = await OrderDb.create({ ...order }) as unknown as OrderEntity;

    return orders;
  }

  updateOrder = async (order: OrderEntity): Promise<OrderEntity | undefined> => {
    const updatedOrder = await OrderDb.update(order, {
      where: { id: order.id },
    }) as unknown as OrderEntity;

    return updatedOrder;
  }

  deleteOrder = async (id: number): Promise<boolean> => {
    const rowDeleted = await OrderDb.destroy({
      where: { id },
    });

    return rowDeleted === 1;
  }
}

export const orderRepository = new OrderRepository();
