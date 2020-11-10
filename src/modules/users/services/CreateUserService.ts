import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../entities/User';
import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, cpf, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ email }, { cpf }],
    });

    if (checkUserExists) {
      throw new AppError('Email or CPF already used!');
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      cpf,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
