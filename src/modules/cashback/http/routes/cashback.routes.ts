import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import authenticated from '../../../users/http/middlewares/authenticated';
import CashbackController from '../controllers/CashbackController';

const cashbackRouter = Router();

const cashbackController = new CashbackController();

cashbackRouter.use(authenticated);

cashbackRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      cpf: Joi.string()
        .required()
        .regex(/^\d{3}\d{3}\d{3}\d{2}$/),
    },
  }),
  cashbackController.index,
);

export default cashbackRouter;
