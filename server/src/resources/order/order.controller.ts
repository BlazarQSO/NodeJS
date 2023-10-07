import express, { Request } from 'express';
import * as orderService from './order.service';
import { StatusCode } from '../../constants';
import { UUID } from 'crypto';
import { RequestOrderBody } from './order.interfaces';
import { auth } from '../../middleware/auth.middleware';
import { CustomRequest } from '../../types/declaration';

const orderRouter = express.Router();

// admin role
orderRouter.get('/orders', async (_, res) => {
  const orders = await orderService.getOrders();
  res.status(StatusCode.OK).send(orders);
});

// get all user orders
orderRouter.get('/order', auth, async (req: CustomRequest, res): Promise<void> => {
    const orders = await orderService.getUserOrders(req.userAuth as UUID);
    res.status(StatusCode.OK).send(orders);
  });

orderRouter.get('/order/:id', auth, async (req: CustomRequest, res): Promise<void> => {
    const order = await orderService.getOrder(req.params.id as UUID, req.userAuth as UUID);
    res.status(StatusCode.OK).send(order);
  });

orderRouter.post('/order', auth, async (req: CustomRequest, res): Promise<void> => {
    const order = await orderService.createOrder({ ...req.body, userId: req.userAuth });
    res.status(StatusCode.CREATED).send(order);
});

orderRouter.put('/order/:id', auth, async (req: CustomRequest, res): Promise<void> => {
    const order = await orderService.updateOrder({
      id: req.params.id as UUID,
      ...<RequestOrderBody>req.body,
      userId: req.userAuth as UUID
    });
    res.status(StatusCode.OK).send(order);
  });

orderRouter.delete('/order/:id', auth, async (req: CustomRequest, res): Promise<void> => {
    await orderService.deleteOrder(req.params.id as UUID, req.userAuth as UUID);
    res.sendStatus(StatusCode.NO_CONTENT);
  });

export { orderRouter };
