import * as productRepository from './product.repository';
import { Product } from './product.model';
import { UUID } from 'crypto';

export const getProducts = (): Promise<Product[]> => productRepository.getProducts();

export const getProduct = (id: UUID): Promise<Product | undefined> => productRepository.getProduct(id);

export const createProduct = (
  product: Product,
): Promise<Product> => productRepository.createProduct(new Product(product));

export const updateProduct = (
  product: Product,
): Promise<Product | undefined> => productRepository.updateProduct(product);

export const deleteProduct = (id: UUID): Promise<void> => productRepository.deleteProduct(id);
