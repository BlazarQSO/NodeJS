import { defaultProducts } from './default-products';
import { getArray, getRandomIntInclusive } from '../utils';
import { CartEntity } from '../resources/cart/cart.interfaces';
import { OrderStatus, PaymentType, DeliveryType, OrderEntity } from '../resources/order/order.interfaces';
import { UserEntity } from '../resources/user/user.interfaces';
import { ProductEntity } from '../resources/product/product.interfaces';
import { CartItemEntity } from '../resources/cart-item/cart-item.interfaces';

const DEFAULT_COUNT_OBJECTS = 5;

export const defaultUserDb = getArray<UserEntity>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: index + 1,
  login: `name${index + 1}`,
  email: `name${index + 1}@mail.com`,
  password: `password${index + 1}`,
}));

export const defaultProductDb = getArray<ProductEntity>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: index + 1,
  title: defaultProducts[index].title,
  description: defaultProducts[index].description,
  price: defaultProducts[index].price,
  img: defaultProducts[index].img,
}));

export const defaultCartDb = getArray<CartEntity>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: index + 1,
  userId: defaultUserDb[index].id,
  isDeleted: false,
}));

export const defaultCartItemDb = getArray<CartItemEntity>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: index + 1,
  cartId: defaultCartDb[index].id,
  productId: defaultProductDb[index].id,
  title: defaultProductDb[index].title,
  description: defaultProductDb[index].description,
  price: defaultProductDb[index].price,
  count: getRandomIntInclusive(1, 3),
}));

export const defaultOrderDb = getArray<OrderEntity>(DEFAULT_COUNT_OBJECTS, (_, index) => ({
  id: index + 1,
  userId: defaultUserDb[index].id,
  cartId: defaultCartDb[index].id,
  paymentType: getRandomIntInclusive(1, 3) % 2 === 0 ? PaymentType.CASH : PaymentType.CREDIT_CARD,
  deliveryType: getRandomIntInclusive(1, 3) % 2 === 0 ? DeliveryType.POST : DeliveryType.COURIER,
  address: `address: Delivery street ${index + 1}`,
  comments: 'urgent delivery',
  date: new Date(),
  status: getRandomIntInclusive(1, 3) % 2 === 0 ? OrderStatus.CREATED : OrderStatus.COMPLETED,
  total: defaultCartItemDb[index].price * defaultCartItemDb[index].count,
}));
