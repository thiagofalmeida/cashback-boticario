import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      cpf,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
