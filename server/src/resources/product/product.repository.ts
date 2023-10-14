import { UUID } from 'crypto';
import { productDb } from '../../database';
import { Product } from './product.model';

export const getProducts = async (): Promise<Product[]> => {
  const users = await productDb.getProducts();
  return users;
};

export const getProduct = async (id: UUID): Promise<Product | undefined> => {
  const product = await productDb.getProduct(id);
  return product;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const users = await productDb.createProduct(product);
  return users;
};

export const updateProduct = async (product: Product): Promise<Product | undefined> => {
  const updatedProduct = await productDb.updateProduct(product);
  return updatedProduct;
}

export const deleteProduct = async (id: UUID): Promise<void> => {
  await productDb.deleteProduct(id);
};
