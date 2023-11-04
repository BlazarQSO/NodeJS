import express from 'express';
import * as orderService from './order.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';

const orderRouter = express.Router();

orderRouter.get('/orders/all', async (_, res) => {
  const orders = await orderService.getOrders();
  res.status(StatusCode.OK).send(orders);
});

orderRouter.get('/orders/:id', async (req, res): Promise<void> => {
  const order = await orderService.getOrder(req.params.id as unknown as Types.ObjectId);

  res.status(StatusCode.OK).send(order);
});

orderRouter.get('/orders/:userId', async (req, res): Promise<void> => {
  const orders = await orderService.getUserOrders(req.params.userId as unknown as Types.ObjectId);

  res.status(StatusCode.OK).send(orders);
});


orderRouter.post('/orders', async (req, res): Promise<void> => {
  const order = await orderService.createOrder(req.body);

  res.status(StatusCode.CREATED).send(order);
});

orderRouter.put('/orders', async (req, res): Promise<void> => {
  const order = await orderService.updateOrder(req.body);

  res.status(StatusCode.OK).send(order);
});

orderRouter.delete('/orders', async (req, res): Promise<void> => {
  await orderService.deleteOrder(req.body.id);

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { orderRouter };
