import { Router } from 'express';
import * as productService from './product.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';
import { isAuth } from '../../middleware/auth.middleware';

const productRouter = Router();

productRouter.get('/', async (_, res): Promise<void> => {
  const products = await productService.getProducts();

  res.status(StatusCode.OK).send(products);
});

productRouter.get('/:id', async (req, res): Promise<void> => {
  const product = await productService.getProduct(req.params.id as unknown as Types.ObjectId);

  res.status(StatusCode.OK).send(product);
});

productRouter.post('/', isAuth, async (req, res): Promise<void> => {
  const { img }: any = req.files || {};
  const product = await productService.createProduct({ ...req.body, img });

  res.status(StatusCode.CREATED).send(product);
});

productRouter.put('/:id', isAuth, async (req, res): Promise<void> => {
  const product = await productService.updateProduct({ _id: req.params.id, ...req.body});

  res.status(StatusCode.OK).send(product);
});

productRouter.delete('/:id', isAuth, async (req, res): Promise<void> => {
  console.log('delete req.user', req.user);
  await productService.deleteProduct(req.params.id as unknown as Types.ObjectId);

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { productRouter };
