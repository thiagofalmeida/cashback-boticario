import { getRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import User from '../../users/entities/User';
import Order from '../../orders/entities/Order';
import api from '../../../config/api';

interface Response {
  cpf: string;
  credit: number;
}

interface BoticarioApiResponse {
  statusCode: number;
  body: {
    credit: number;
  };
}

class ListCashbackAccumulationService {
  public async execute(cpf: string): Promise<Response> {
    const usersRepository = getRepository(User);
    const ordersRepository = getRepository(Order);

    const user = await usersRepository.findOne({
      where: { cpf },
    });

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const userOrders = await ordersRepository.find({
      where: { cpf: user.cpf },
    });

    const ordersTotal = userOrders.reduce((accumulator, order) => {
      return accumulator + Number(order.cashback_return_value);
    }, 0);

    const { data } = await api.get<BoticarioApiResponse>(
      `/cashback?cpf=${cpf}`,
    );

    const credit = data.body.credit + ordersTotal;

    return { cpf, credit };
  }
}

export default ListCashbackAccumulationService;
