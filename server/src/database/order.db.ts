import { UUID } from 'crypto';
import { Order } from '../resources/order/order.model';
import { updateEntity, delayDb } from '../utils';
import { defaultOrderDb } from '../constants';

class OrderDB {
  orders: Order[]

  constructor(orders: Order[] = defaultOrderDb) {
    this.orders = orders;
  }

  async getOrders(): Promise<Order[]> {
    await delayDb();

    return this.orders;
  }

  async getOrder(id: UUID, userId: UUID): Promise<Order | undefined> {
    await delayDb();

    const order = this.findOrder(id);
    if (order?.userId === userId) {
      return order;
    }
  }

  async getUserOrders(currentUserId: UUID): Promise<Order[]> {
    await delayDb();

    return this.orders.filter(({ userId }) => userId === currentUserId);
  }

  async createOrder(order: Order): Promise<Order> {
    await delayDb();

    this.orders.push(order);
    return order;
  }

  async updateOrder(order: Order): Promise<Order | undefined> {
    await delayDb();

    const updatedOrder = this.findOrder(order.id);

    if (updatedOrder) {
      return updateEntity(updatedOrder, order);
    }
  }

  async deleteOrder(orderId: UUID, currentUserId: UUID): Promise<void> {
    await delayDb();

    this.orders = this.orders.filter(({ id, userId }) => !(id === orderId && userId === currentUserId));
  }

  findOrder(orderId: UUID): Order | undefined {
    return this.orders.find(({ id }) => id === orderId);
  }
}

export const orderDb = new OrderDB();
