import { defaultProductDb } from '../../constants';
import { ProductDb } from '../../database/models.db';
import { IProduct, ProductEntity } from './product.interfaces';

class ProductRepository {
  constructor() {
    const addDefaultProducts = async () => {
      setTimeout(() => {
        Promise.all(defaultProductDb.map(async ({ title, price, description }) => {
          const found = await ProductDb.findOne({
            where: {
              title,
            },
          });
          !found && await ProductDb.create({ title, price, description });
        }));
      }, 5000);
    }
    addDefaultProducts();
  }

  getProducts = async (): Promise<ProductEntity[]> => {
    const products = await ProductDb.findAll() as unknown as ProductEntity[];
    return products;
  }

  getProduct = async (id: number): Promise<ProductEntity | undefined> => {
    const product = await ProductDb.findOne({
      where: { id },
    }) as unknown as ProductEntity;

    return product;
  }

  createProduct = async (product: IProduct): Promise<ProductEntity> => {
    const { title, price, description, img } = product;

    let fileName;

    // if (img) {
    //   const fileName = randomUUID() + '.jpg';
    //   img.mv(path.relative(__dirname, '..', 'assets', fileName));
    // }

    const newProduct = await ProductDb.create(
      { title, price, description, img: fileName }
    ) as unknown as ProductEntity;

    return newProduct;
  }

  updateProduct = async (product: ProductEntity): Promise<ProductEntity> => {
    const updatedProduct = await ProductDb.update(product, {
      where: { id: product.id },
    }) as unknown as ProductEntity;

    return updatedProduct;
  }

  deleteProduct = async (id: number): Promise<boolean> => {
    const rowDeleted = await ProductDb.destroy({
      where: { id }
    });

    return rowDeleted === 1;
  }
}

export const productRepository = new ProductRepository();
