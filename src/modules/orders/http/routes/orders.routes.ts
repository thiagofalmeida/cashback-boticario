import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OrdersController from '../controllers/OrdersController';
import authenticated from '../../../users/http/middlewares/authenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(authenticated);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.number().required(),
      cpf: Joi.string().required(),
      price: Joi.number().precision(2),
      date: Joi.date(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
