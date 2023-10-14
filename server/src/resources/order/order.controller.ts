import express, { Request } from 'express';
import * as orderService from './order.service';
import { StatusCode } from '../../constants';
import { UUID } from 'crypto';
import { RequestOrderBody } from './order.interfaces';
import { auth } from '../../middleware/auth.middleware';
import { CustomRequest } from '../../types/declaration';
import { getCart } from '../cart/cart.repository';
import { Order } from './order.model';

const orderRouter = express.Router();

// admin role
orderRouter.get('/orders/all', async (_, res) => {
  const orders = await orderService.getOrders();
  res.status(StatusCode.OK).send(orders);
});

// admin role
orderRouter.get('/orders/all/:id', auth, async (req: CustomRequest, res): Promise<void> => {
    const order = await orderService.getOrder(req.params.id as UUID, req.userAuth as UUID);
    // const order = await orderService.getOrder(req.params.id as UUID, req.userAuth as UUID);
    res.status(StatusCode.OK).send(order);
  });

// get all user orders
orderRouter.post('/orders', async (req: CustomRequest, res): Promise<void> => {
  const orders = await orderService.getUserOrders(req.body.userId);
  // const orders = await orderService.getUserOrders(req.userAuth as UUID);
  res.status(StatusCode.OK).send(orders);
});

// auth
orderRouter.post('/orders', async (req: CustomRequest, res): Promise<void> => {
    const { status, comments, total, date, delivery, paymentType, userId } = req.body;
    const cart = await getCart(userId);
    const order = await orderService.createOrder({
      status,
      comments,
      total,
      date,
      delivery,
      paymentType,
      userId,
      cartId: cart?.id,
    } as Order);
    // const order = await orderService.createOrder({ ...req.body, userId: req.userAuth });
    res.status(StatusCode.CREATED).send(order);
  });

orderRouter.put('/orders', async (req: CustomRequest, res): Promise<void> => {
    const order = await orderService.updateOrder(req.body);
    // const order = await orderService.updateOrder({
    //   id: req.params.id as UUID,
    //   ...<RequestOrderBody>req.body,
    //   userId: req.userAuth as UUID
    // });
    res.status(StatusCode.OK).send(order);
  });

orderRouter.delete('/orders', async (req: CustomRequest, res): Promise<void> => {
    await orderService.deleteOrder(req.body.id);
    // await orderService.deleteOrder(req.params.id as UUID, req.userAuth as UUID);
    res.sendStatus(StatusCode.NO_CONTENT);
  });

export { orderRouter };
