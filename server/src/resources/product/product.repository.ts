import { Types } from 'mongoose';
import { IProduct, ProductEntity } from './product.interfaces';
import { Product } from './product.models';

class ProductRepository {
  getProducts = async (): Promise<ProductEntity[] | null> => {
    const products = await Product.find();

    return products;
  }

  getProduct = async (_id: Types.ObjectId): Promise<ProductEntity | null> => {
    const product = await Product.findById({ _id });

    return product;
  }

  createProduct = async (product: IProduct): Promise<ProductEntity> => {
    const { img } = product;

    let fileName;

    // if (img) {
    //   const fileName = randomUUID() + '.jpg';
    //   img.mv(path.relative(__dirname, '..', 'assets', fileName));
    // }

    const newProduct = new Product({ ...product, img: fileName });
    await newProduct.save();

    return newProduct;
  }

  updateProduct = async (productEntity: ProductEntity): Promise<ProductEntity | null> => {
    const { _id, ...product } = productEntity;
    const updatedProduct = await Product.findByIdAndUpdate(_id, product);

    return updatedProduct;
  }

  deleteProduct = async (_id: Types.ObjectId): Promise<ProductEntity | null> => {
    const deletedProduct = await Product.findByIdAndDelete({ _id });

    return deletedProduct;
  }
}

export const productRepository = new ProductRepository();
