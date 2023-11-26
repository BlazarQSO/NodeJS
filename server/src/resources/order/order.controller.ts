import express from 'express';
import * as orderService from './order.service';
import { StatusCode } from '../../constants';
import { Types } from 'mongoose';
import { logger, loggerWrite } from '../../logger/logger';

const orderRouter = express.Router();

orderRouter.get('/orders/all', async (req, res) => {
  logger.profile('get-orders');
  const orders = await orderService.getOrders();
  loggerWrite(req, 'get-orders');

  res.status(StatusCode.OK).send(orders);
});

orderRouter.get('/orders/:id', async (req, res): Promise<void> => {
  logger.profile('get-order-by-id');
  const order = await orderService.getOrder(req.params.id as unknown as Types.ObjectId);
  loggerWrite(req, 'get-order-by-id');

  res.status(StatusCode.OK).send(order);
});

orderRouter.get('/orders/:userId', async (req, res): Promise<void> => {
  logger.profile('get-user-orders');
  const orders = await orderService.getUserOrders(req.params.userId as unknown as Types.ObjectId);
  loggerWrite(req, 'get-user-orders');

  res.status(StatusCode.OK).send(orders);
});


orderRouter.post('/orders', async (req, res): Promise<void> => {
  logger.profile('create-order');
  const order = await orderService.createOrder(req.body);
  loggerWrite(req, 'create-order');

  res.status(StatusCode.CREATED).send(order);
});

orderRouter.put('/orders', async (req, res): Promise<void> => {
  logger.profile('update-order');
  const order = await orderService.updateOrder(req.body);
  loggerWrite(req, 'update-order');

  res.status(StatusCode.OK).send(order);
});

orderRouter.delete('/orders', async (req, res): Promise<void> => {
  logger.profile('delete-order');
  await orderService.deleteOrder(req.body.id);
  loggerWrite(req, 'delete-order');

  res.sendStatus(StatusCode.NO_CONTENT);
});

export { orderRouter };
