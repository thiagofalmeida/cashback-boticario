import { Request, Response } from 'express';

import ListCashbackAccumulationService from '../../services/ListCashbackAccumulationService';

export default class CashbackController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.query;

    const listCackback = new ListCashbackAccumulationService();

    const credit = await listCackback.execute(String(cpf));

    return response.json(credit);
  }
}
