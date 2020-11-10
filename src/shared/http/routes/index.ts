import { Router } from 'express';

import usersRouter from '../../../modules/users/http/routes/users.routes';
import sessionsRouter from '../../../modules/users/http/routes/sessions.routes';
import cashbackRouter from '../../../modules/cashback/http/routes/cashback.routes';
import ordersRouter from '../../../modules/orders/http/routes/orders.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/cashback', cashbackRouter);
routes.use('/orders', ordersRouter);

export default routes;
