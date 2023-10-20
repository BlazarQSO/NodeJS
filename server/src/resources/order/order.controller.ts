import express from 'express';
import * as orderService from './order.service';
import { StatusCode } from '../../constants';
import { auth } from '../../middleware/auth.middleware';
import { CustomRequest } from '../../types/declaration';

const orderRouter = express.Router();

// admin role
orderRouter.get('/orders/all', async (_, res) => {
  const orders = await orderService.getOrders();
  res.status(StatusCode.OK).send(orders);
});

// admin role
orderRouter.get('/orders/all/:id', auth, async (req: CustomRequest, res): Promise<void> => {
    const order = await orderService.getOrder(Number(req.params.id));

    res.status(StatusCode.OK).send(order);
  });

// auth get all user orders or create user order
orderRouter.post('/orders', async (req: CustomRequest, res): Promise<void> => {
    const { status, comments, total, date, address, deliveryType, paymentType, userId } = req.body;
    if (!status) {
      const orders = await orderService.getUserOrders(userId);
      res.status(StatusCode.OK).send(orders);

      return;
    }

    const order = await orderService.createOrder({
      status,
      comments,
      total,
      date,
      address,
      deliveryType,
      paymentType,
      userId,
    });

    res.status(StatusCode.CREATED).send(order);
  });

orderRouter.put('/orders', async (req: CustomRequest, res): Promise<void> => {
    const order = await orderService.updateOrder(req.body);

    res.status(StatusCode.OK).send(order);
  });

orderRouter.delete('/orders', async (req: CustomRequest, res): Promise<void> => {
    await orderService.deleteOrder(req.body.id);

    res.sendStatus(StatusCode.NO_CONTENT);
  });

export { orderRouter };
