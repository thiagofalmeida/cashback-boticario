import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateOrderService from '../../services/CreateOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code, cpf, price, date } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      code,
      cpf,
      price,
      date,
    });

    return response.json(classToClass(order));
  }
}
