import { UUID } from 'crypto';
import { Product } from '../resources/product/product.model';
import { updateEntity, delayDb } from '../utils';
import { defaultProductDb } from '../constants';

class ProductDB {
  products: Product[]

  constructor(products: Product[] = defaultProductDb) {
    this.products = products;
  }

  async getProduct(productId: UUID): Promise<Product | undefined> {
    await delayDb();

    return this.findProduct(productId);
  }

  async getProducts(): Promise<Product[]> {
    await delayDb();

    return this.products;
  }

  async createProduct(product: Product): Promise<Product> {
    await delayDb();

    this.products.push(product);
    return product;
  }

  async updateProduct(product: Product): Promise<Product | undefined> {
    await delayDb();

    const updatedProduct = this.findProduct(product.id);

    if (updatedProduct) {
      return updateEntity(updatedProduct, product);
    }
  }

  async deleteProduct(productId: UUID): Promise<void> {
    await delayDb();

    this.products = this.products.filter(({ id }) => id !== productId);
  }

  findProduct(productId: UUID): Product | undefined {
    return this.products.find(({ id }) => id === productId);
  }
}

export const productDb = new ProductDB();
