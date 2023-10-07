import { UUID, randomUUID } from 'crypto';
import { ProductEntity } from './product.interfaces';

export class Product implements ProductEntity {
  id: UUID;
  title: string;
  description: string;
  price: number;
  img: string;

  constructor({ title, description, price, img }: ProductEntity) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.price = price;
    this.img = img;
  }
}
