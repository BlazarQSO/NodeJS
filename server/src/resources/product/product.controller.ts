import { Request, Router } from 'express';
import * as productService from './product.service';
import { StatusCode } from '../../constants';
import { UUID } from 'crypto';
import { RequestProductBody } from './product.interfaces';

const productRouter = Router();

productRouter.get('/', async (_, res): Promise<void> => {
  const products = await productService.getProducts();
  res.status(StatusCode.OK).send(products);
});

productRouter.get('/:id', async (req: Request<{ id: UUID}>, res): Promise<void> => {
  const product = await productService.getProduct(req.params.id);
  res.status(StatusCode.OK).send(product);
});

// admin role
productRouter.post('/', async (req, res): Promise<void> => {
  const product = await productService.createProduct(req.body);
  res.status(StatusCode.CREATED).send(product);
});

// admin role
productRouter.put('/:id', async (req: Request<{ id: UUID }>, res): Promise<void> => {
  const product = await productService.updateProduct({ id: req.params.id, ...<RequestProductBody>req.body});
  res.status(StatusCode.OK).send(product);
});

// admin role
productRouter.delete('/:id', async (req: Request<{ id: UUID}>, res): Promise<void> => {
  await productService.deleteProduct(req.params.id);
  res.sendStatus(StatusCode.NO_CONTENT);
});

export { productRouter };
