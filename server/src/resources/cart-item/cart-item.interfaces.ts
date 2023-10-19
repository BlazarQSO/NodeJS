export interface ICartItem {
  cartId: number;
  productId: number;
  title: string;
  description: string;
  price: number;
  count: number;
}

export interface CartItemEntity extends ICartItem {
  id: number;
}
