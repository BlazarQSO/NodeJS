import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';
import { PORT, StatusCode } from './constants';
import { userRouter } from './resources/user/user.controller';
import { cartRouter } from './resources/cart/cart.controller';
import { productRouter } from './resources/product/product.controller';
import { orderRouter } from './resources/order/order.controller';
import { ValidationError } from 'express-validation';
import { routerAuth } from './auth/auth.routes';
import 'dotenv/config';

const port = process.env.PORT || PORT;
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/', (req, res, next) => {
// 	if (req.originalUrl === '/') {
// 		res.send('Service is running!');
// 		return;
// 	}
// 	next();
// });

// app.use('/login', login, (req, res, next) => {
// 	next();
// });

app.use((err: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(err);
});

app.use('/auth', routerAuth);
app.use('/user', userRouter);
app.use('/user', cartRouter);
app.use('/products', productRouter);
app.use('/user', orderRouter);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
