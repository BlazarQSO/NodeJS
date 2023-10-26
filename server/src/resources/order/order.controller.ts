import express from 'express';
import * as orderService from './order.service';
import { StatusCode } from '../../constants';
import { auth } from '../../middleware/auth.middleware';

const orderRouter = express.Router();

// admin role
orderRouter.get('/orders/all', async (_, res) => {
  const orders = await orderService.getOrders();
  res.status(StatusCode.OK).send(orders);
});

// admin role
orderRouter.get('/orders/all/:id', auth, async (req, res): Promise<void> => {
    const order = await orderService.getOrder(req.params.id);

    res.status(StatusCode.OK).send(order);
  });

// auth get all user orders or create user order
orderRouter.post('/orders', async (req, res): Promise<void> => {
    const { status, userId } = req.body;
    if (!status) {
      const orders = await orderService.getUserOrders(userId);
      res.status(StatusCode.OK).send(orders);

      return;
    }

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
