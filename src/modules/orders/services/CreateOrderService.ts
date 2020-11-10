import { getRepository } from 'typeorm';

import Order from '../entities/Order';
import User from '../../users/entities/User';
import AppError from '../../../shared/errors/AppError';

interface Request {
  code: number;
  cpf: string;
  price: number;
  date: Date;
}

class CreateUserService {
  public async execute({ code, cpf, price, date }: Request): Promise<Order> {
    const ordersRepository = getRepository(Order);
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { cpf },
    });

    if (!userExists) {
      throw new AppError('User does not exists!');
    }

    const order = ordersRepository.create({
      code,
      price,
      date,
      cpf,
      status: cpf === '15350946056' ? 'Aprovado' : 'Em validação',
    });

    await ordersRepository.save(order);

    return order;
  }
}

export default CreateUserService;
