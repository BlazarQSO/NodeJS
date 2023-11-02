import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import YAML from 'yamljs';
import mongoose, { ConnectOptions, Types } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { StatusCode } from './constants';
import { userRouter } from './resources/user/user.controller';
import { cartRouter } from './resources/cart/cart.controller';
import { productRouter } from './resources/product/product.controller';
import { orderRouter } from './resources/order/order.controller';
import { ValidationError } from 'express-validation';
import { routerAuth } from './auth/auth.routes';
import fileUpload from 'express-fileupload';
import { PORT } from './public.env';
import { errorMiddleware } from './middleware/error.middleware';
import { cartItemRouter } from './resources/cart-item/cart-item.controller';
import { mongoConfig } from './db';
import cors from 'cors';
import { UserEntity } from './resources/user/user.interfaces';
import { verifyToken } from './middleware/verify-token.middleware';

declare global {
  namespace Express {
      interface Request {
        user: UserEntity;
      }
  }
}

const port = PORT;
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'assets')));
app.use(fileUpload({}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(err);
});

app.use('/auth', routerAuth);
app.use('/', verifyToken);
app.use('/user', userRouter);
app.use('/user', cartRouter);
app.use('/user', cartItemRouter);
app.use('/products', productRouter);
app.use('/user', orderRouter);

app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(mongoConfig.uri, mongoConfig.options as ConnectOptions);

		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	} catch (error) {
    console.log('error: ', error);
		process.exit(1);
  }
}

start();
