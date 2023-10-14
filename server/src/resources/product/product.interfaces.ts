import { UUID } from 'crypto';

export interface ProductEntity {
  id: UUID;
  title: string;
  description: string;
  price: number;
  img: string;
}

export type RequestProductBody = Omit<ProductEntity, 'id'>;
