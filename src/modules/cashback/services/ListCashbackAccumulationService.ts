// import AppError from '../../../shared/errors/AppError';
import { getRepository } from 'typeorm';
import api from '../../../config/api';
import AppError from '../../../shared/errors/AppError';
import User from '../../users/entities/User';

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

    const userExists = await usersRepository.findOne({
      where: { cpf },
    });

    if (!userExists) {
      throw new AppError('User does not exists!');
    }

    const { data } = await api.get<BoticarioApiResponse>(
      `/cashback?cpf=${cpf}`,
    );

    return { cpf, credit: data.body.credit };
  }
}

export default ListCashbackAccumulationService;
