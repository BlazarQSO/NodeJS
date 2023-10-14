import { UUID, randomUUID } from 'crypto';
import { Delivery, OrderStatus, OrderEntity, PaymentType } from './order.interfaces';

export class Order implements OrderEntity {
  id: UUID;
  userId: UUID;
  cartId: UUID;
  paymentType: PaymentType;
  delivery: Delivery;
  comments: string;
  status: OrderStatus;
  total: number;
  date: Date;

  constructor({ userId, cartId, paymentType, delivery, comments, status, total, date }: OrderEntity) {
    this.id = randomUUID();
    this.userId = userId;
    this.cartId = cartId;
    this.paymentType = paymentType;
    this.delivery = delivery;
    this.comments = comments;
    this.status = status;
    this.total = total;
    this.date = date;
  }
}
