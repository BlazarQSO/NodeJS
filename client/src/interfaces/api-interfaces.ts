export type UUID = `${string}-${string}-${string}-${string}-${string}`

export interface ProductEntity {
  id: UUID;
  title: string;
  description: string;
  price: number;
  img?: string;
}

export interface OrderEntity {
  id: UUID;
  userId: UUID;
  cartId: UUID;
  paymentType: PaymentType;
  delivery: Delivery;
  comments: string;
  status: OrderStatus;
  date: Date;
  total: number;
}

export enum DeliveryType {
  SELF_PICKUP = 'self-pickup',
  COURIER = 'courier',
  POST = 'post',
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

export interface IUser {
  login: string;
  email: string;
  password: string;
}

export interface UserEntity extends IUser {
  id: UUID;
}

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface ICart {
  userId: UUID;
  isDeleted?: boolean;
  items?: CartItemEntity[];
}

export interface CartEntity extends ICart {
  id: UUID;
}

export enum ActionUpdateCart {
  ADD_ITEM = 'add_item',
  RESET_CART = 'reset_cart',
  DELETE_ITEM = 'delete_item',
  UPDATE_ITEM = 'update_item',
}
