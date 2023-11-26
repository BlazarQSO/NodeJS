import { Router } from 'express';
import * as productService from './product.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';
import { isAuth } from '../../middleware/auth.middleware';
import { logger, loggerWrite } from '../../logger/logger';

const productRouter = Router();

productRouter.get('/', async (req, res): Promise<void> => {
  logger.profile('get-products');
  const products = await productService.getProducts();
  loggerWrite(req, 'get-products');

  res.status(StatusCode.OK).send(products);
});

productRouter.get('/:id', async (req, res): Promise<void> => {
  logger.profile('get-product-by-id');
  const product = await productService.getProduct(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'get-product-by-id');

  res.status(StatusCode.OK).send(product);
});

productRouter.post('/', isAuth, async (req, res): Promise<void> => {
  logger.profile('create-product');
  // const { img }: any = req.files || {};
  const product = await productService.createProduct({ ...req.body });
  loggerWrite(req, 'create-product');

  res.status(StatusCode.CREATED).send(product);
});

productRouter.put('/:id', isAuth, async (req, res): Promise<void> => {
  logger.profile('update-product');
  const product = await productService.updateProduct({ _id: req.params.id, ...req.body});
  loggerWrite(req, 'update-product');

  res.status(StatusCode.OK).send(product);
});

productRouter.delete('/:id', isAuth, async (req, res): Promise<void> => {
  logger.profile('delete-product');
  await productService.deleteProduct(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'delete-product');

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { productRouter };
