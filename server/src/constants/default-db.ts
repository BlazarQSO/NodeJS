import { randomUUID } from 'crypto';
import { defaultProducts } from './default-products';
import { getArray, getRandomIntInclusive } from '../utils';
import { User } from '../resources/user/user.model';
import { Product } from '../resources/product/product.model';
import { Cart } from '../resources/cart/cart.model';
import { Order } from '../resources/order/order.model';
import { CartItemEntity } from '../resources/cart/cart.interfaces';
import { OrderStatus, PaymentType, DeliveryType } from '../resources/order/order.interfaces';

const DEFAULT_COUNT_OBJECTS = 5;

export const defaultUserDb = getArray<User>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: randomUUID(),
  login: `name${index + 1}`,
  email: `name${index + 1}@mail.com`,
  password: `password${index + 1}`,
}));

export const defaultProductDb = getArray<Product>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: randomUUID(),
  title: defaultProducts[index].title,
  description: defaultProducts[index].description,
  price: defaultProducts[index].price,
  img: defaultProducts[index].img,
}));

export const defaultCartDb = getArray<Cart>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: randomUUID(),
  userId: defaultUserDb[index].id,
  isDeleted: false,
  items: getArray<CartItemEntity>(getRandomIntInclusive(1, 3), (_, index) => ({
    product: defaultProductDb[index],
    count: getRandomIntInclusive(1, 3),
  })),
}));

export const defaultOrderDb = getArray<Order>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: randomUUID(),
  userId: defaultUserDb[index].id,
  cartId: defaultCartDb[index].id,
  paymentType: PaymentType.CASH,
  delivery: {
    deliveryType: DeliveryType.POST,
    address: `address: Delivery street ${index}`,
  },
  comments: 'urgent delivery',
  status: OrderStatus.COMPLETED,
  total: defaultCartDb[index].items.reduce((sum, { product, count }: CartItemEntity) => sum + product.price * count, 0),
}));;
