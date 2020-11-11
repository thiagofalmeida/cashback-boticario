import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import OrdersController from '../controllers/OrdersController';
import authenticated from '../../../users/http/middlewares/authenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(authenticated);

ordersRouter.get('/', ordersController.index);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.number().required(),
      cpf: Joi.string()
        .required()
        .regex(/^\d{3}\d{3}\d{3}\d{2}$/),
      price: Joi.number().precision(2),
      date: Joi.date(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
