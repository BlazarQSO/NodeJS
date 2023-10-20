import { productRepository } from './product.repository';
import { IProduct, ProductEntity } from './product.interfaces';

export const getProducts = (): Promise<ProductEntity[]> => productRepository.getProducts();

export const getProduct = (id: number): Promise<ProductEntity | undefined> => productRepository.getProduct(id);

export const createProduct = (product: IProduct): Promise<ProductEntity> => {
  return productRepository.createProduct(product);
}

export const updateProduct = (
  product: ProductEntity,
): Promise<ProductEntity | undefined> => productRepository.updateProduct(product);

export const deleteProduct = (id: number): Promise<boolean> => productRepository.deleteProduct(id);
