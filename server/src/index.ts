import express, { Request, Response } from 'express';
import path from 'path';
import YAML from 'yamljs';
import mongoose, { ConnectOptions } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { StatusCode } from './constants';
import { userRouter } from './resources/user/user.controller';
import { cartRouter } from './resources/cart/cart.controller';
import { productRouter } from './resources/product/product.controller';
import { orderRouter } from './resources/order/order.controller';
import { ValidationError } from 'express-validation';
import { routerAuth } from './auth/auth.routes';
import fileUpload from 'express-fileupload';
import { errorMiddleware } from './middleware/error.middleware';
import { cartItemRouter } from './resources/cart-item/cart-item.controller';
import { mongoConfig } from './db';
import cors from 'cors';
import { UserEntity } from './resources/user/user.interfaces';
import { verifyToken } from './middleware/verify-token.middleware';
import { Socket } from 'net';
import 'dotenv/config';
import { logger } from './logger/logger';

declare global {
  namespace Express {
      interface Request {
        user: UserEntity;
      }
  }
}

const port = process.env.PORT;
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'assets')));
app.use(fileUpload({}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Application is healthy' });
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

		const server = app.listen(port, () => {
			logger.info(`Server started on port ${port}`);
		});

		let connections: Socket[] = [];

		server.on('connection', (connection) => {
			connections.push(connection);

			connection.on('close', () => {
				connections = connections.filter((currentConnection) => currentConnection !== connection);
			});
		});

		const shutdown = () => {
			logger.info('Received kill signal, shutting down gracefully');

			server.close(() => {
				logger.info('Closed out remaining connections');
				process.exit(0);
			});

			mongoose.connection.close();

			setTimeout(() => {
				logger.error('Could not close connections in time, forcefully shutting down');
				process.exit(1);
			}, 20000);

			connections.forEach((connection) => connection.end());

			setTimeout(() => {
				connections.forEach((connection) => connection.destroy());
			}, 10000);
		}

		process.on('SIGTERM', shutdown);
		process.on('SIGINT', shutdown);

	} catch (error) {
    logger.error('error: ', error);
		process.exit(1);
  }
}

start();
