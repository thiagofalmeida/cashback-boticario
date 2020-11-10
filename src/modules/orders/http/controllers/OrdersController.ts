import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ListOrdersService from '../../services/ListOrdersService';
import CreateOrderService from '../../services/CreateOrderService';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrders = new ListOrdersService();

    const orders = await listOrders.execute();

    return response.json(orders);
  }

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
