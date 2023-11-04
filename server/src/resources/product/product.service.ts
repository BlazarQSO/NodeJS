import { productRepository } from './product.repository';
import { IProduct, ProductEntity } from './product.interfaces';
import { Types } from 'mongoose';

export const getProducts = (): Promise<ProductEntity[] | null> => productRepository.getProducts();

export const getProduct = (
  id: Types.ObjectId,
): Promise<ProductEntity | null> => productRepository.getProduct(id);

export const createProduct = (product: IProduct): Promise<ProductEntity> => {
  return productRepository.createProduct(product);
}

export const updateProduct = (
  product: ProductEntity,
): Promise<ProductEntity | null> => productRepository.updateProduct(product);

export const deleteProduct = (
  id: Types.ObjectId,
): Promise<ProductEntity | null> => productRepository.deleteProduct(id);
