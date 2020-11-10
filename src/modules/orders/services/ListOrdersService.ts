import { getRepository } from 'typeorm';

import Order from '../entities/Order';

class ListOrdersService {
  public async execute(): Promise<Order[]> {
    const ordersRepository = getRepository(Order);

    const order = await ordersRepository.find();

    return order;
  }
}

export default ListOrdersService;
