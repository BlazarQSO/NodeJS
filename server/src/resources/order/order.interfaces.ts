import { Types } from 'mongoose';

export interface IOrder {
  userId: string;
  paymentType: PaymentType;
  deliveryType: DeliveryType;
  address: string;
  status: OrderStatus;
  comments: string;
  total: number;
  date: Date;
}

export interface OrderEntity extends IOrder {
  _id: string | Types.ObjectId;
}

export enum OrderStatus {
  CREATED = 'created',
  COMPLETED = 'completed',
}

export enum PaymentType {
  CASH = 'cash',
  CREDIT_CARD = 'credit-card',
}

export enum DeliveryType {
  SELF_PICKUP = 'self-pickup',
  COURIER = 'courier',
  POST = 'post',
}
