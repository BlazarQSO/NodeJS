import { useEffect, useState } from 'react';
import { useHttp } from './use-http';
import { CartEntity, UUID } from '../interfaces';
import { BASE_URL, HttpMethods } from '../constants';
import { useGetData } from './use-get-data';

export const useProductCount = (userId: UUID): [number, () => void] => {
  const [productCount, setProductCount] = useState(0);
  const { request } = useHttp(false);

  const [cart, productCountHandler] = useGetData<CartEntity>({
    request,
    url: `${BASE_URL}/user/cart`,
    method: HttpMethods.POST,
    body: { userId },
    dependencies: userId,
  });

  useEffect(() => {
    const newCountProduct = cart?.items?.reduce((sum, item) => sum + item.count, 0) || 0;
    setProductCount(newCountProduct);
  }, [cart]);

  return [productCount, productCountHandler];
}
