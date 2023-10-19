export interface IOrder {
  userId: number;
  paymentType: PaymentType;
  deliveryType: DeliveryType;
  address: string;
  status: OrderStatus;
  comments: string;
  total: number;
  date: Date;
}

export interface OrderEntity extends IOrder {
  id: number;
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
