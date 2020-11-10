import { Request, Response } from 'express';

import ListCashbackAccumulation from '../../services/ListCashbackAccumulation';

export default class CashbackController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.query;

    const listCackback = new ListCashbackAccumulation();

    const credit = await listCackback.execute(String(cpf));

    return response.json(credit);
  }
}
