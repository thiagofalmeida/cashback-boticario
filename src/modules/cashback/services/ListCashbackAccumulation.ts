// import AppError from '../../../shared/errors/AppError';
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

class ListCashbackAccumulation {
  public async execute(cpf: string): Promise<Response> {
    const { data } = await api.get<BoticarioApiResponse>(
      `/cashback?cpf=${cpf}`,
    );

    return { cpf, credit: data.body.credit };
  }
}

export default ListCashbackAccumulation;
