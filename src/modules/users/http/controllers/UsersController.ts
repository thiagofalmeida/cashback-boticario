import { Request, Response } from 'express';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    return response.json({ msg: 'oi' });
  }
}
