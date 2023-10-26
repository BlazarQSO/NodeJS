import { Router } from 'express';
import * as productService from './product.service';
import { StatusCode } from '../../constants';

const productRouter = Router();

productRouter.get('/', async (_, res): Promise<void> => {
  const products = await productService.getProducts();

  res.status(StatusCode.OK).send(products);
});

productRouter.get('/:id', async (req, res): Promise<void> => {
  const product = await productService.getProduct(req.params.id);

  res.status(StatusCode.OK).send(product);
});

// admin role
productRouter.post('/', async (req, res): Promise<void> => {
  const { img }: any = req.files || {};
  const product = await productService.createProduct({ ...req.body, img });

  res.status(StatusCode.CREATED).send(product);
});

// admin role
productRouter.put('/:id', async (req, res): Promise<void> => {
  const product = await productService.updateProduct({ id: req.params.id, ...req.body});

  res.status(StatusCode.OK).send(product);
});

// admin role
productRouter.delete('/:id', async (req, res): Promise<void> => {
  await productService.deleteProduct(req.params.id);

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { productRouter };
