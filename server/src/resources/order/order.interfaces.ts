import { UUID } from 'crypto';

export interface OrderEntity {
  id: UUID;
  userId: UUID;
  cartId: UUID;
  paymentType: PaymentType;
  delivery: Delivery;
  comments: string;
  status: OrderStatus;
  total: number;
}

export type Delivery = {
  deliveryType: DeliveryType;
  address: string;
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

export type RequestOrderBody = Omit<OrderEntity, 'id'>;
